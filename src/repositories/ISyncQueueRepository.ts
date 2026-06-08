import {SyncItem} from '../types';

export interface ISyncQueueRepository {
  /**
   * Adds a new item to the end of the queue.
   */
  enqueue(item: SyncItem): Promise<void>;

  /**
   * Removes and returns the first item from the queue.
   * Returns null if the queue is empty.
   */
  dequeue(): Promise<SyncItem | null>;

  /**
   * Returns the first item from the queue without removing it.
   * Returns null if the queue is empty.
   */
  peek(): Promise<SyncItem | null>;

  /**
   * Returns all items currently in the queue.
   */
  getAll(): Promise<SyncItem[]>;

  /**
   * Removes all items from the queue.
   */
  clear(): Promise<void>;
}
