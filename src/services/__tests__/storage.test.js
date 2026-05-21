import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveTasks, getTasks} from '../storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe('Storage Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  describe('saveTasks', () => {
    it('should save tasks as a JSON string', async () => {
      const tasks = [{id: '1', task: 'Test', done: false}];
      await saveTasks(tasks);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@doit:tasks',
        JSON.stringify(tasks),
      );
    });

    it('should throw an error if AsyncStorage.setItem fails', async () => {
      const tasks = [{id: '1', task: 'Test', done: false}];
      const error = new Error('Storage error');
      AsyncStorage.setItem.mockRejectedValueOnce(error);

      await expect(saveTasks(tasks)).rejects.toThrow('Storage error');
    });
  });

  describe('getTasks', () => {
    it('should return parsed tasks from storage', async () => {
      const tasks = [{id: '1', task: 'Test', done: false}];
      AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(tasks));

      const result = await getTasks();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@doit:tasks');
      expect(result).toEqual(tasks);
    });

    it('should return an empty array if storage is empty', async () => {
      AsyncStorage.getItem.mockResolvedValueOnce(null);

      const result = await getTasks();

      expect(result).toEqual([]);
    });

    it('should throw an error if AsyncStorage.getItem fails', async () => {
      const error = new Error('Storage error');
      AsyncStorage.getItem.mockRejectedValueOnce(error);

      await expect(getTasks()).rejects.toThrow('Storage error');
    });
  });
});
