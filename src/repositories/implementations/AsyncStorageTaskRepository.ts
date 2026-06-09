import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from '../../types';
import {ITaskRepository} from '../ITaskRepository';
import {encrypt, decrypt} from '../../utils/security';

const STORAGE_KEY = '@doit:tasks';

export class AsyncStorageTaskRepository implements ITaskRepository {
  private inMemoryTasks: Task[] | null = null;

  async getAll(): Promise<Task[]> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);

      if (value === null) {
        this.inMemoryTasks = [];
        return [];
      }

      let jsonValue: string | null = value;

      // Try to decrypt
      const decrypted = decrypt(value);

      if (decrypted) {
        jsonValue = decrypted;
      } else {
        // Fallback: If decryption fails, check if it's raw JSON (migration case)
        try {
          JSON.parse(value);
          // It's valid JSON, so it's not encrypted yet. We'll encrypt it on next save.
          jsonValue = value;
        } catch (e) {
          // It's not valid JSON and not decryptable
          console.error('Data is corrupted or invalid');
          return [];
        }
      }

      const tasks: Task[] = JSON.parse(jsonValue);
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
      const encryptedValue = encrypt(jsonValue);
      await AsyncStorage.setItem(STORAGE_KEY, encryptedValue);
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
