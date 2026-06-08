import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from '../../types';
import {ITaskRepository} from '../ITaskRepository';

const STORAGE_KEY = '@doit:tasks';

export class AsyncStorageTaskRepository implements ITaskRepository {
  private inMemoryTasks: Task[] | null = null;

  async getAll(): Promise<Task[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      const tasks: Task[] = jsonValue != null ? JSON.parse(jsonValue) : [];
      this.inMemoryTasks = tasks;
      return tasks;
    } catch (error) {
      console.error(
        'Error getting tasks from AsyncStorageTaskRepository:',
        error,
      );

      // Fallback to in-memory tasks if storage fails but we have data in memory
      if (this.inMemoryTasks !== null) {
        console.warn(
          'Falling back to in-memory tasks in AsyncStorageTaskRepository',
        );
        return this.inMemoryTasks;
      }

      throw error;
    }
  }

  async saveAll(tasks: Task[]): Promise<void> {
    try {
      this.inMemoryTasks = tasks;
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving tasks in AsyncStorageTaskRepository:', error);
      throw error;
    }
  }

  /**
   * Sync implementation for AsyncStorageTaskRepository.
   * Local storage doesn't sync with itself, so this is a no-op.
   */
  async sync(): Promise<void> {
    return Promise.resolve();
  }
}
