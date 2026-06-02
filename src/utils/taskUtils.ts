import {Task, TaskPriority} from '../types';

/**
 * Task Utility Functions
 */

/**
 * Sorting types constants
 */
export const SORT_TYPES = {
  DEFAULT: 'DEFAULT', // Status (unfinished first) + Priority + Date (newest first)
  DATE_DESC: 'DATE_DESC', // Newest first
  DATE_ASC: 'DATE_ASC', // Oldest first
  ALPHABETICAL: 'ALPHABETICAL', // A-Z
  PRIORITY: 'PRIORITY', // High -> Medium -> Low -> None
} as const;

export type SortType = typeof SORT_TYPES[keyof typeof SORT_TYPES];

const PRIORITY_SCORE: Record<TaskPriority, number> = {
  high: 3,
  medium: 2,
  low: 1,
  none: 0,
};

/**
 * Sorts tasks based on the specified sort type.
 *
 * @param tasks - The list of tasks to sort.
 * @param sortType - The sorting strategy to use.
 * @returns The sorted list of tasks.
 */
export const sortTasks = (
  tasks: Task[],
  sortType: SortType = SORT_TYPES.DEFAULT,
): Task[] => {
  if (!Array.isArray(tasks)) {
    return [];
  }

  return [...tasks].sort((a, b) => {
    switch (sortType) {
      case SORT_TYPES.ALPHABETICAL:
        return a.task.localeCompare(b.task);

      case SORT_TYPES.DATE_ASC: {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateA - dateB;
      }

      case SORT_TYPES.DATE_DESC: {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      }

      case SORT_TYPES.PRIORITY: {
        const scoreA = PRIORITY_SCORE[a.priority] || 0;
        const scoreB = PRIORITY_SCORE[b.priority] || 0;
        if (scoreA !== scoreB) {
          return scoreB - scoreA;
        }
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      }

      case SORT_TYPES.DEFAULT:
      default: {
        // First, sort by status: unfinished first
        if (a.done !== b.done) {
          return a.done ? 1 : -1;
        }

        // Then, sort by priority
        const scoreA = PRIORITY_SCORE[a.priority] || 0;
        const scoreB = PRIORITY_SCORE[b.priority] || 0;
        if (scoreA !== scoreB) {
          return scoreB - scoreA;
        }

        // Then, sort by creation date: newest first
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

        // If creation dates are the same (or missing), use IDs as fallback
        if (dateA === dateB) {
          return b.id.localeCompare(a.id);
        }

        return dateB - dateA;
      }
    }
  });
};

/**
 * Filters tasks based on a search term.
 *
 * @param tasks - The list of tasks to filter.
 * @param search - The search term.
 * @returns The filtered list of tasks.
 */
export const filterTasksBySearch = (tasks: Task[], search: string): Task[] => {
  if (!Array.isArray(tasks)) {
    return [];
  }
  if (!search || search.trim() === '') {
    return tasks;
  }

  const normalizedSearch = search.toLowerCase();
  return tasks.filter(t => t.task.toLowerCase().includes(normalizedSearch));
};

interface TaskStats {
  total: number;
  completed: number;
}

/**
 * Summarizes task statistics.
 *
 * @param tasks - The list of tasks.
 * @returns Statistics object with total and completed counts.
 */
export const getTaskStats = (tasks: Task[]): TaskStats => {
  const safeTasks = Array.isArray(tasks) ? tasks.filter(t => !t.archived) : [];
  return {
    total: safeTasks.length,
    completed: safeTasks.filter(t => t.done).length,
  };
};
