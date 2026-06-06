import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageTaskRepository} from '../AsyncStorageTaskRepository';
import {Task} from '../../../types';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe('AsyncStorageTaskRepository', () => {
  let repository: AsyncStorageTaskRepository;

  beforeEach(() => {
    repository = new AsyncStorageTaskRepository();
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
    (console.warn as jest.Mock).mockRestore();
  });

  describe('saveAll', () => {
    it('should save tasks as a JSON string', async () => {
      const tasks: Task[] = [
        {
          id: '1',
          task: 'Test',
          done: false,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          archived: false,
          deadline: null,
          createdAt: '2023-01-01T12:00:00.000Z',
          completedAt: null,
        },
      ];
      await repository.saveAll(tasks);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@doit:tasks',
        JSON.stringify(tasks),
      );
    });

    it('should throw an error if AsyncStorage.setItem fails', async () => {
      const tasks: Task[] = [
        {
          id: '1',
          task: 'Test',
          done: false,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          archived: false,
          deadline: null,
          createdAt: '2023-01-01T12:00:00.000Z',
          completedAt: null,
        },
      ];
      const error = new Error('Storage error');
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(error);

      await expect(repository.saveAll(tasks)).rejects.toThrow('Storage error');
    });
  });

  describe('getAll', () => {
    it('should return parsed tasks from storage', async () => {
      const tasks: Task[] = [
        {
          id: '1',
          task: 'Test',
          done: false,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          archived: false,
          deadline: null,
          createdAt: '2023-01-01T12:00:00.000Z',
          completedAt: null,
        },
      ];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(tasks),
      );

      const result = await repository.getAll();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@doit:tasks');
      expect(result).toEqual(tasks);
    });

    it('should return an empty array if storage is empty', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await repository.getAll();

      expect(result).toEqual([]);
    });

    it('should throw an error if AsyncStorage.getItem fails and no in-memory cache', async () => {
      const error = new Error('Storage error');
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(error);

      try {
        await repository.getAll();
      } catch (e: any) {
        expect(e.message).toBe('Storage error');
      }
    });

    it('should fallback to in-memory tasks if storage fails and cache exists', async () => {
      const tasks: Task[] = [
        {
          id: '2',
          task: 'Memory Test',
          done: false,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          archived: false,
          deadline: null,
          createdAt: '2023-01-01T12:00:00.000Z',
          completedAt: null,
        },
      ];

      // Seed the cache
      await repository.saveAll(tasks);

      // Make next read fail
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
        new Error('Storage error'),
      );

      const result = await repository.getAll();

      expect(result).toEqual(tasks);
      expect(console.warn).toHaveBeenCalledWith(
        'Falling back to in-memory tasks in AsyncStorageTaskRepository',
      );
    });
  });
});
