import AsyncStorage from '@react-native-async-storage/async-storage';
import {SyncItem} from '../../types';
import {ISyncQueueRepository} from '../ISyncQueueRepository';
import {logger} from '../../utils/logger';

const SYNC_QUEUE_KEY = '@doit:sync_queue';

export class AsyncStorageSyncQueueRepository implements ISyncQueueRepository {
  async getAll(): Promise<SyncItem[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(SYNC_QUEUE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      logger.error('Error getting sync queue from AsyncStorage:', error);
      return [];
    }
  }

  async enqueue(item: SyncItem): Promise<void> {
    try {
      const queue = await this.getAll();
      queue.push(item);
      await AsyncStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
    } catch (error) {
      logger.error('Error enqueuing item in AsyncStorage:', error);
      throw error;
    }
  }

  async dequeue(): Promise<SyncItem | null> {
    try {
      const queue = await this.getAll();
      if (queue.length === 0) {
        return null;
      }
      const item = queue.shift();
      await AsyncStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
      return item || null;
    } catch (error) {
      logger.error('Error dequeuing item in AsyncStorage:', error);
      throw error;
    }
  }

  async peek(): Promise<SyncItem | null> {
    try {
      const queue = await this.getAll();
      return queue.length > 0 ? queue[0] : null;
    } catch (error) {
      logger.error('Error peeking item in AsyncStorage:', error);
      return null;
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SYNC_QUEUE_KEY);
    } catch (error) {
      logger.error('Error clearing sync queue in AsyncStorage:', error);
      throw error;
    }
  }
}
