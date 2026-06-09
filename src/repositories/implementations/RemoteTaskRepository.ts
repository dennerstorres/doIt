import {api} from '../../services/api';
import {Task} from '../../types';
import {ITaskRepository} from '../ITaskRepository';
import {logger} from '../../utils/logger';

/**
 * Remote repository implementation for future backend synchronization.
 * This interacts with a remote API using the configured axios instance.
 */
export class RemoteTaskRepository implements ITaskRepository {
  private readonly resource = '/tasks';

  /**
   * Fetches all tasks from the remote source.
   */
  async getAll(): Promise<Task[]> {
    try {
      const response = await api.get<Task[]>(this.resource);
      return response.data;
    } catch (error) {
      logger.error('Error fetching tasks from RemoteTaskRepository:', error);
      throw error;
    }
  }

  /**
   * Persists the list of tasks to the remote source.
   * Note: In a real-world scenario, this might be a sync or batch update.
   * @param tasks - The list of tasks to save.
   */
  async saveAll(tasks: Task[]): Promise<void> {
    try {
      await api.post(this.resource, {tasks});
    } catch (error) {
      logger.error('Error saving tasks to RemoteTaskRepository:', error);
      throw error;
    }
  }

  /**
   * Sync implementation for RemoteTaskRepository.
   * Since this is the remote source itself, sync is a no-op or could trigger
   * internal consistency checks if needed.
   */
  async sync(): Promise<void> {
    return Promise.resolve();
  }
}
