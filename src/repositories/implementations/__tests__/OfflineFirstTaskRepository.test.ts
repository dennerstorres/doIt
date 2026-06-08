import {OfflineFirstTaskRepository} from '../OfflineFirstTaskRepository';
import {ITaskRepository} from '../../ITaskRepository';
import {ISyncQueueRepository} from '../../ISyncQueueRepository';
import {Task} from '../../../types';

describe('OfflineFirstTaskRepository', () => {
  let repository: OfflineFirstTaskRepository;
  let mockLocalRepo: jest.Mocked<ITaskRepository>;
  let mockRemoteRepo: jest.Mocked<ITaskRepository>;
  let mockSyncQueue: jest.Mocked<ISyncQueueRepository>;

  const mockTask: Task = {
    id: '1',
    task: 'Offline Task',
    done: false,
    priority: 'none',
    category: 'none',
    repeat: 'none',
    archived: false,
    deadline: null,
    createdAt: '2023-01-01T12:00:00.000Z',
    updatedAt: '2023-01-01T12:00:00.000Z',
    completedAt: null,
    deleted: false,
  };

  beforeEach(() => {
    mockLocalRepo = {
      getAll: jest.fn(),
      saveAll: jest.fn(),
    };
    mockRemoteRepo = {
      getAll: jest.fn(),
      saveAll: jest.fn(),
    };
    mockSyncQueue = {
      enqueue: jest.fn(),
      dequeue: jest.fn(),
      peek: jest.fn(),
      getAll: jest.fn(),
      clear: jest.fn(),
    };
    repository = new OfflineFirstTaskRepository(
      mockLocalRepo,
      mockRemoteRepo,
      mockSyncQueue,
    );
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return tasks from local repository', async () => {
      mockLocalRepo.getAll.mockResolvedValueOnce([mockTask]);

      const result = await repository.getAll();

      expect(mockLocalRepo.getAll).toHaveBeenCalled();
      expect(result).toEqual([mockTask]);
      expect(mockRemoteRepo.getAll).not.toHaveBeenCalled();
    });
  });

  describe('saveAll', () => {
    it('should save locally and then remotely', async () => {
      mockLocalRepo.saveAll.mockResolvedValueOnce();
      mockRemoteRepo.saveAll.mockResolvedValueOnce();

      const tasks = [mockTask];
      await repository.saveAll(tasks);

      expect(mockLocalRepo.saveAll).toHaveBeenCalledWith(tasks);
      expect(mockRemoteRepo.saveAll).toHaveBeenCalledWith(tasks);
      expect(mockSyncQueue.enqueue).not.toHaveBeenCalled();
    });

    it('should enqueue item if remote save fails', async () => {
      mockLocalRepo.saveAll.mockResolvedValueOnce();
      mockRemoteRepo.saveAll.mockRejectedValueOnce(new Error('Remote fail'));
      mockSyncQueue.enqueue.mockResolvedValueOnce();

      const tasks = [mockTask];
      await repository.saveAll(tasks);

      expect(mockLocalRepo.saveAll).toHaveBeenCalledWith(tasks);
      expect(mockRemoteRepo.saveAll).toHaveBeenCalledWith(tasks);
      expect(mockSyncQueue.enqueue).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'SAVE_TASKS',
          payload: tasks,
        }),
      );
    });

    it('should throw if local save fails', async () => {
      mockLocalRepo.saveAll.mockRejectedValueOnce(new Error('Local fail'));

      const tasks = [mockTask];
      await expect(repository.saveAll(tasks)).rejects.toThrow('Local fail');
      expect(mockRemoteRepo.saveAll).not.toHaveBeenCalled();
      expect(mockSyncQueue.enqueue).not.toHaveBeenCalled();
    });
  });
});
