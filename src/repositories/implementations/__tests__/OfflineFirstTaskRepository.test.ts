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
      sync: jest.fn(),
    };
    mockRemoteRepo = {
      getAll: jest.fn(),
      saveAll: jest.fn(),
      sync: jest.fn(),
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

    it('should handle enqueue failure gracefully', async () => {
      mockLocalRepo.saveAll.mockResolvedValueOnce();
      mockRemoteRepo.saveAll.mockRejectedValueOnce(new Error('Remote fail'));
      mockSyncQueue.enqueue.mockRejectedValueOnce(new Error('Queue fail'));

      const tasks = [mockTask];
      await repository.saveAll(tasks);

      expect(mockSyncQueue.enqueue).toHaveBeenCalled();
      // Should not throw because we catch it
    });

    it('should throw if local save fails', async () => {
      mockLocalRepo.saveAll.mockRejectedValueOnce(new Error('Local fail'));

      const tasks = [mockTask];
      await expect(repository.saveAll(tasks)).rejects.toThrow('Local fail');
      expect(mockRemoteRepo.saveAll).not.toHaveBeenCalled();
      expect(mockSyncQueue.enqueue).not.toHaveBeenCalled();
    });
  });

  describe('sync', () => {
    it('should process all items in the queue successfully', async () => {
      const mockSyncItems = [
        {
          id: '1',
          type: 'SAVE_TASKS' as const,
          payload: [mockTask],
          createdAt: '2023-01-01T12:00:00Z',
        },
        {
          id: '2',
          type: 'SAVE_TASKS' as const,
          payload: [],
          createdAt: '2023-01-01T12:01:00Z',
        },
      ];

      mockSyncQueue.getAll.mockResolvedValueOnce(mockSyncItems);
      mockRemoteRepo.saveAll.mockResolvedValue(Promise.resolve());
      mockSyncQueue.dequeue.mockResolvedValue(null); // Return doesn't matter for dequeue

      await repository.sync();

      expect(mockSyncQueue.getAll).toHaveBeenCalled();
      expect(mockRemoteRepo.saveAll).toHaveBeenCalledTimes(2);
      expect(mockSyncQueue.dequeue).toHaveBeenCalledTimes(2);
    });

    it('should stop processing on first remote failure', async () => {
      const mockSyncItems = [
        {
          id: '1',
          type: 'SAVE_TASKS' as const,
          payload: [mockTask],
          createdAt: '2023-01-01T12:00:00Z',
        },
        {
          id: '2',
          type: 'SAVE_TASKS' as const,
          payload: [],
          createdAt: '2023-01-01T12:01:00Z',
        },
      ];

      mockSyncQueue.getAll.mockResolvedValueOnce(mockSyncItems);
      mockRemoteRepo.saveAll.mockRejectedValueOnce(new Error('Sync failed'));

      await repository.sync();

      expect(mockRemoteRepo.saveAll).toHaveBeenCalledTimes(1);
      expect(mockSyncQueue.dequeue).not.toHaveBeenCalled();
    });

    it('should stop processing if dequeue fails', async () => {
      const mockSyncItems = [
        {
          id: '1',
          type: 'SAVE_TASKS' as const,
          payload: [mockTask],
          createdAt: '2023-01-01T12:00:00Z',
        },
      ];

      mockSyncQueue.getAll.mockResolvedValueOnce(mockSyncItems);
      mockRemoteRepo.saveAll.mockResolvedValueOnce(Promise.resolve());
      mockSyncQueue.dequeue.mockRejectedValueOnce(new Error('Dequeue failed'));

      await repository.sync();

      expect(mockRemoteRepo.saveAll).toHaveBeenCalledTimes(1);
      expect(mockSyncQueue.dequeue).toHaveBeenCalledTimes(1);
    });
  });
});
