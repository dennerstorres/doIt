import {Task, SyncItem} from '../../types';
import {ITaskRepository} from '../ITaskRepository';
import {ISyncQueueRepository} from '../ISyncQueueRepository';

/**
 * Offline-first repository that coordinates between local and remote sources.
 * It prioritizes local storage for immediate availability (offline-first)
 * and attempts to synchronize with the remote source.
 */
export class OfflineFirstTaskRepository implements ITaskRepository {
  private localRepository: ITaskRepository;
  private remoteRepository: ITaskRepository;
  private syncQueue: ISyncQueueRepository;

  constructor(
    localRepository: ITaskRepository,
    remoteRepository: ITaskRepository,
    syncQueue: ISyncQueueRepository,
  ) {
    this.localRepository = localRepository;
    this.remoteRepository = remoteRepository;
    this.syncQueue = syncQueue;
  }

  /**
   * Returns tasks from local storage immediately to support offline-first.
   * In the future, this could also trigger a background sync.
   */
  async getAll(): Promise<Task[]> {
    return this.localRepository.getAll();
  }

  /**
   * Saves tasks locally first for immediate persistence and then attempts
   * to save to the remote source.
   * @param tasks - The list of tasks to save.
   */
  async saveAll(tasks: Task[]): Promise<void> {
    // Always save locally first
    await this.localRepository.saveAll(tasks);

    // Attempt to save remotely
    try {
      await this.remoteRepository.saveAll(tasks);
    } catch (error) {
      // In an offline-first approach, we log the remote failure but don't
      // block the user since the local save succeeded.
      // We enqueue the failed operation for future synchronization.
      const syncItem: SyncItem = {
        id: String(new Date().getTime()),
        type: 'SAVE_TASKS',
        payload: tasks,
        createdAt: new Date().toISOString(),
      };

      try {
        await this.syncQueue.enqueue(syncItem);
      } catch (queueError) {
        if (__DEV__) {
          console.error('Failed to enqueue sync item:', queueError);
        }
      }

      if (__DEV__) {
        console.warn(
          'Remote sync failed in OfflineFirstTaskRepository, operation enqueued:',
          error,
        );
      }
    }
  }
}
