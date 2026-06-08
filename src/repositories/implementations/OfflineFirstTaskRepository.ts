import {Task} from '../../types';
import {ITaskRepository} from '../ITaskRepository';

/**
 * Offline-first repository that coordinates between local and remote sources.
 * It prioritizes local storage for immediate availability (offline-first)
 * and attempts to synchronize with the remote source.
 */
export class OfflineFirstTaskRepository implements ITaskRepository {
  private localRepository: ITaskRepository;
  private remoteRepository: ITaskRepository;

  constructor(
    localRepository: ITaskRepository,
    remoteRepository: ITaskRepository,
  ) {
    this.localRepository = localRepository;
    this.remoteRepository = remoteRepository;
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
      // Future tasks will implement a sync queue to retry this.
      if (__DEV__) {
        console.warn(
          'Remote sync failed in OfflineFirstTaskRepository, will retry later:',
          error,
        );
      }
    }
  }
}
