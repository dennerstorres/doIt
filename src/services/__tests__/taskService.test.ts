import {TaskServiceClass} from '../taskService';
import {ITaskRepository} from '../../repositories/ITaskRepository';
import {Task} from '../../types';

describe('TaskService', () => {
  let mockRepository: jest.Mocked<ITaskRepository>;
  let service: TaskServiceClass;

  beforeEach(() => {
    mockRepository = {
      getAll: jest.fn(),
      saveAll: jest.fn(),
      sync: jest.fn(),
    };
    service = new TaskServiceClass(mockRepository);
  });

  describe('getAll', () => {
    it('should call repository.getAll', async () => {
      const mockTasks: Task[] = [];
      mockRepository.getAll.mockResolvedValue(mockTasks);

      const result = await service.getAll();

      expect(result).toBe(mockTasks);
      expect(mockRepository.getAll).toHaveBeenCalled();
    });
  });

  describe('saveAll', () => {
    it('should call repository.saveAll', async () => {
      const mockTasks: Task[] = [];
      mockRepository.saveAll.mockResolvedValue();

      await service.saveAll(mockTasks);

      expect(mockRepository.saveAll).toHaveBeenCalledWith(mockTasks);
    });
  });

  describe('validate', () => {
    it('should return invalid for empty title', () => {
      const result = service.validate('  ', []);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('A tarefa não pode estar vazia.');
    });

    it('should return invalid for too short title', () => {
      const result = service.validate('ab', []);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('pelo menos');
    });

    it('should return invalid for too long title', () => {
      const result = service.validate('a'.repeat(51), []);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('no máximo');
    });

    it('should return invalid for duplicate title', () => {
      const tasks: Task[] = [
        {
          id: '1',
          task: 'Existing',
          done: false,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          archived: false,
          deadline: null,
          createdAt: '',
          updatedAt: '',
          completedAt: null,
          deleted: false,
        },
      ];
      const result = service.validate('existing', tasks);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Esta tarefa já existe.');
    });

    it('should return valid for duplicate title if id is excluded', () => {
      const tasks: Task[] = [
        {
          id: '1',
          task: 'Existing',
          done: false,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          archived: false,
          deadline: null,
          createdAt: '',
          updatedAt: '',
          completedAt: null,
          deleted: false,
        },
      ];
      const result = service.validate('existing', tasks, '1');
      expect(result.valid).toBe(true);
    });

    it('should return valid for unique title', () => {
      const result = service.validate('New Task', []);
      expect(result.valid).toBe(true);
    });

    it('should ignore deleted tasks in duplicate check', () => {
      const tasks: Task[] = [
        {
          id: '1',
          task: 'Existing',
          done: false,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          archived: false,
          deadline: null,
          createdAt: '',
          updatedAt: '',
          completedAt: null,
          deleted: true,
        },
      ];
      const result = service.validate('existing', tasks);
      expect(result.valid).toBe(true);
    });
  });

  describe('getNextOccurrence', () => {
    it('should return null if repeat is none', () => {
      const task: Task = {
        id: '1',
        task: 'Test',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        archived: false,
        deadline: null,
        createdAt: '',
        updatedAt: '',
        completedAt: null,
        deleted: false,
      };
      expect(service.getNextOccurrence(task)).toBeNull();
    });

    it('should return next instance for daily repeat', () => {
      const deadline = new Date('2023-01-01T12:00:00.000Z').toISOString();
      const task: Task = {
        id: '1',
        task: 'Daily',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'daily',
        archived: false,
        deadline,
        createdAt: '',
        updatedAt: '',
        completedAt: null,
        deleted: false,
      };

      const next = service.getNextOccurrence(task);

      expect(next).not.toBeNull();
      expect(next?.task).toBe('Daily');
      expect(next?.deadline).toBe(
        new Date('2023-01-02T12:00:00.000Z').toISOString(),
      );
    });

    it('should return next instance without deadline if original had none', () => {
      const task: Task = {
        id: '1',
        task: 'Daily',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'daily',
        archived: false,
        deadline: null,
        createdAt: '',
        updatedAt: '',
        completedAt: null,
        deleted: false,
      };

      const next = service.getNextOccurrence(task);

      expect(next).not.toBeNull();
      expect(next?.deadline).toBeNull();
    });
  });

  describe('sync', () => {
    it('should call repository.sync and handle concurrency', async () => {
      mockRepository.sync.mockResolvedValue(Promise.resolve());

      // First call
      const syncPromise1 = service.sync();
      // Second call while first is still running
      const syncPromise2 = service.sync();

      await Promise.all([syncPromise1, syncPromise2]);

      expect(mockRepository.sync).toHaveBeenCalledTimes(1);
    });

    it('should reset isSyncing even on error', async () => {
      mockRepository.sync.mockRejectedValueOnce(new Error('Sync error'));

      await service.sync();

      expect(mockRepository.sync).toHaveBeenCalledTimes(1);

      // Should be able to call it again after it reset
      mockRepository.sync.mockResolvedValueOnce(Promise.resolve());
      await service.sync();
      expect(mockRepository.sync).toHaveBeenCalledTimes(2);
    });
  });
});
