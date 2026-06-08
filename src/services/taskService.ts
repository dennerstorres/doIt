import {Task} from '../types';
import {ITaskRepository} from '../repositories/ITaskRepository';
import {AsyncStorageTaskRepository} from '../repositories/implementations/AsyncStorageTaskRepository';
import {RemoteTaskRepository} from '../repositories/implementations/RemoteTaskRepository';
import {OfflineFirstTaskRepository} from '../repositories/implementations/OfflineFirstTaskRepository';
import {AsyncStorageSyncQueueRepository} from '../repositories/implementations/AsyncStorageSyncQueueRepository';
import {createTask} from '../models/Task';
import {
  MIN_TASK_LENGTH,
  MAX_TASK_LENGTH,
  TASK_REPEATS,
} from '../constants/tasks';

/**
 * Service to handle task-related business logic and data operations.
 * This prepares the application for a future backend integration by
 * abstracting data access and business rules through a repository pattern.
 */
export class TaskServiceClass {
  private repository: ITaskRepository;
  private isSyncing = false;

  constructor(repository: ITaskRepository) {
    this.repository = repository;
  }

  /**
   * Retrieves all tasks from the current data source.
   */
  async getAll(): Promise<Task[]> {
    return this.repository.getAll();
  }

  /**
   * Persists the list of tasks to the current data source.
   * @param tasks - The list of tasks to save.
   */
  async saveAll(tasks: Task[]): Promise<void> {
    return this.repository.saveAll(tasks);
  }

  /**
   * Triggers a synchronization of pending offline changes.
   * Uses a guard to prevent multiple concurrent sync operations.
   */
  async sync(): Promise<void> {
    if (this.isSyncing) {
      return;
    }

    try {
      this.isSyncing = true;
      await this.repository.sync();
    } catch (error) {
      if (__DEV__) {
        console.error('TaskService sync error:', error);
      }
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * Validates a task title against business rules.
   * @param title - The task title to validate.
   * @param currentTasks - The current list of tasks to check for duplicates.
   * @param excludeId - Optional ID to exclude from duplicate check (useful for edits).
   * @returns An object indicating if the title is valid and an error message if not.
   */
  validate(
    title: string,
    currentTasks: Task[],
    excludeId?: string,
  ): {valid: boolean; error?: string} {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return {valid: false, error: 'A tarefa não pode estar vazia.'};
    }

    if (trimmedTitle.length < MIN_TASK_LENGTH) {
      return {
        valid: false,
        error: `A tarefa deve ter pelo menos ${MIN_TASK_LENGTH} caracteres.`,
      };
    }

    if (trimmedTitle.length > MAX_TASK_LENGTH) {
      return {
        valid: false,
        error: `A tarefa deve ter no máximo ${MAX_TASK_LENGTH} caracteres.`,
      };
    }

    const taskExists = currentTasks.some(
      t =>
        !t.deleted &&
        (excludeId ? t.id !== excludeId : true) &&
        t.task.toLowerCase() === trimmedTitle.toLowerCase(),
    );

    if (taskExists) {
      return {valid: false, error: 'Esta tarefa já existe.'};
    }

    return {valid: true};
  }

  /**
   * Calculates the next occurrence of a repeating task.
   * @param item - The task that was completed.
   * @returns A new Task instance for the next occurrence, or null if no repeat is configured.
   */
  getNextOccurrence(item: Task): Task | null {
    if (item.repeat === TASK_REPEATS.NONE) {
      return null;
    }

    let nextDeadline: string | null = null;

    if (item.deadline) {
      const date = new Date(item.deadline);
      if (item.repeat === TASK_REPEATS.DAILY) {
        date.setDate(date.getDate() + 1);
      } else if (item.repeat === TASK_REPEATS.WEEKLY) {
        date.setDate(date.getDate() + 7);
      } else if (item.repeat === TASK_REPEATS.MONTHLY) {
        date.setMonth(date.getMonth() + 1);
      }
      nextDeadline = date.toISOString();
    }

    return createTask(
      item.task,
      item.priority,
      item.category,
      nextDeadline,
      item.repeat,
    );
  }
}

// Export a default instance using OfflineFirstTaskRepository
// This coordinates local persistence and remote synchronization.
export const TaskService = new TaskServiceClass(
  new OfflineFirstTaskRepository(
    new AsyncStorageTaskRepository(),
    new RemoteTaskRepository(),
    new AsyncStorageSyncQueueRepository(),
  ),
);
