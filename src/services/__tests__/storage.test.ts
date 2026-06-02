import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveTasks, getTasks} from '../storage';
import {Task} from '../../types';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe('Storage Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
    (console.warn as jest.Mock).mockRestore();
  });

  describe('saveTasks', () => {
    it('should save tasks as a JSON string', async () => {
      const tasks: Task[] = [
        {
          id: '1',
          task: 'Test',
          done: false,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          archived: false, deadline: null,
          createdAt: '2023-01-01T12:00:00.000Z',
        },
      ];
      await saveTasks(tasks);

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
          archived: false, deadline: null,
          createdAt: '2023-01-01T12:00:00.000Z',
        },
      ];
      const error = new Error('Storage error');
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(error);

      await expect(saveTasks(tasks)).rejects.toThrow('Storage error');
    });
  });

  describe('getTasks', () => {
    it('should return parsed tasks from storage', async () => {
      const tasks: Task[] = [
        {
          id: '1',
          task: 'Test',
          done: false,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          archived: false, deadline: null,
          createdAt: '2023-01-01T12:00:00.000Z',
        },
      ];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(tasks),
      );

      const result = await getTasks();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@doit:tasks');
      expect(result).toEqual(tasks);
    });

    it('should return an empty array if storage is empty', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await getTasks();

      expect(result).toEqual([]);
    });

    it('should throw an error if AsyncStorage.getItem fails and no in-memory cache', async () => {
      const error = new Error('Storage error');
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(error);

      try {
        await getTasks();
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
          archived: false, deadline: null,
          createdAt: '2023-01-01T12:00:00.000Z',
        },
      ];

      // Seed the cache
      await saveTasks(tasks);

      // Make next read fail
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
        new Error('Storage error'),
      );

      const result = await getTasks();

      expect(result).toEqual(tasks);
      expect(console.warn).toHaveBeenCalledWith(
        'Falling back to in-memory tasks',
      );
    });
  });
});
