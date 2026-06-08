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
    it('should reconcile local and remote tasks and clear queue on success', async () => {
      const localTasks: Task[] = [
        {
          ...mockTask,
          id: '1',
          task: 'Local',
          updatedAt: '2023-01-01T10:00:00Z',
        },
      ];
      const remoteTasks: Task[] = [
        {
          ...mockTask,
          id: '1',
          task: 'Remote',
          updatedAt: '2023-01-01T11:00:00Z',
        },
        {
          ...mockTask,
          id: '2',
          task: 'Remote 2',
          updatedAt: '2023-01-01T11:00:00Z',
        },
      ];
      const mockSyncItems = [
        {
          id: 'q1',
          type: 'SAVE_TASKS' as const,
          payload: localTasks,
          createdAt: '2023-01-01T10:00:00Z',
        },
      ];

      mockLocalRepo.getAll.mockResolvedValueOnce(localTasks);
      mockRemoteRepo.getAll.mockResolvedValueOnce(remoteTasks);
      mockRemoteRepo.saveAll.mockResolvedValueOnce();
      mockLocalRepo.saveAll.mockResolvedValueOnce();
      mockSyncQueue.getAll.mockResolvedValueOnce(mockSyncItems);
      mockSyncQueue.dequeue.mockResolvedValue(null);

      await repository.sync();

      expect(mockLocalRepo.getAll).toHaveBeenCalled();
      expect(mockRemoteRepo.getAll).toHaveBeenCalled();

      // Should be called with merged tasks (Remote ID 1 is newer, plus Remote ID 2)
      expect(mockRemoteRepo.saveAll).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({id: '1', task: 'Remote'}),
          expect.objectContaining({id: '2', task: 'Remote 2'}),
        ]),
      );
      expect(mockLocalRepo.saveAll).toHaveBeenCalled();
      expect(mockSyncQueue.dequeue).toHaveBeenCalledTimes(1);
    });

    it('should fallback to queue processing if reconciliation fails', async () => {
      const mockSyncItems = [
        {
          id: 'q1',
          type: 'SAVE_TASKS' as const,
          payload: [mockTask],
          createdAt: '2023-01-01T12:00:00Z',
        },
      ];

      mockLocalRepo.getAll.mockRejectedValueOnce(new Error('Fetch local fail'));
      mockSyncQueue.getAll.mockResolvedValue(mockSyncItems);
      mockRemoteRepo.saveAll.mockResolvedValueOnce();
      mockSyncQueue.dequeue.mockResolvedValue(null);

      await repository.sync();

      // Should have tried fetching local
      expect(mockLocalRepo.getAll).toHaveBeenCalled();

      // Should have fallen back to queue processing
      expect(mockSyncQueue.getAll).toHaveBeenCalled();
      expect(mockRemoteRepo.saveAll).toHaveBeenCalledWith([mockTask]);
      expect(mockSyncQueue.dequeue).toHaveBeenCalled();
    });

    it('should stop queue processing on remote failure during fallback', async () => {
      mockLocalRepo.getAll.mockRejectedValueOnce(new Error('Fetch local fail'));
      mockSyncQueue.getAll.mockResolvedValue([
        {
          id: 'q1',
          type: 'SAVE_TASKS' as const,
          payload: [mockTask],
          createdAt: '2023-01-01T12:00:00Z',
        },
      ]);
      mockRemoteRepo.saveAll.mockRejectedValueOnce(new Error('Remote fail'));

      await repository.sync();

      expect(mockRemoteRepo.saveAll).toHaveBeenCalled();
      expect(mockSyncQueue.dequeue).not.toHaveBeenCalled();
    });
  });
});
