import {Task, TaskPriority, TaskCategory, TaskFilter} from '../types';
import {TASK_FILTERS} from '../constants/tasks';

/**
 * Task Utility Functions
 */

/**
 * Checks if a given date string is today.
 *
 * @param dateStr - ISO date string.
 * @returns True if today.
 */
export const isToday = (dateStr: string | null | undefined): boolean => {
  if (!dateStr) {
    return false;
  }
  const date = new Date(dateStr);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

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

/**
 * Filters tasks based on their completion status.
 *
 * @param tasks - The list of tasks to filter.
 * @param filter - The filter type (all, pending, completed).
 * @returns The filtered list of tasks.
 */
export const filterTasksByStatus = (
  tasks: Task[],
  filter: TaskFilter = TASK_FILTERS.ALL,
): Task[] => {
  if (!Array.isArray(tasks)) {
    return [];
  }

  switch (filter) {
    case TASK_FILTERS.PENDING:
      return tasks.filter(t => !t.done);
    case TASK_FILTERS.COMPLETED:
      return tasks.filter(t => t.done);
    case TASK_FILTERS.ALL:
    default:
      return tasks;
  }
};

export interface TaskStats {
  total: number;
  completed: number;
  completionPercentage: number;
  byPriority: Record<TaskPriority, number>;
  byCategory: Record<TaskCategory, number>;
  totalArchived: number;
  dailyProgress: number;
  streak: number;
}

/**
 * Calculates the current productivity streak (consecutive days with at least one completed task).
 *
 * @param tasks - The list of tasks.
 * @returns The number of consecutive days of completion.
 */
export const calculateStreak = (tasks: Task[]): number => {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return 0;
  }

  // Get completed and non-archived tasks with a valid completedAt timestamp
  const completedTasks = tasks.filter(
    t => !t.archived && t.done && t.completedAt,
  );
  if (completedTasks.length === 0) {
    return 0;
  }

  // Extract unique dates (YYYY-MM-DD)
  const completionDates = new Set<string>();
  completedTasks.forEach(t => {
    if (t.completedAt) {
      completionDates.add(t.completedAt.split('T')[0]);
    }
  });

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const hasCompletedToday = completionDates.has(todayStr);
  const hasCompletedYesterday = completionDates.has(yesterdayStr);

  // If no completions today or yesterday, the streak is broken (0)
  if (!hasCompletedToday && !hasCompletedYesterday) {
    return 0;
  }

  let streak = 0;
  let currentDate = hasCompletedToday ? today : yesterday;

  // Count backwards from the most recent active day
  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0];
    if (completionDates.has(dateStr)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

/**
 * Summarizes task statistics.
 *
 * @param tasks - The list of tasks.
 * @returns Statistics object with detailed metrics.
 */
export const getTaskStats = (tasks: Task[]): TaskStats => {
  if (!Array.isArray(tasks)) {
    return {
      total: 0,
      completed: 0,
      completionPercentage: 0,
      byPriority: {none: 0, low: 0, medium: 0, high: 0},
      byCategory: {
        none: 0,
        work: 0,
        personal: 0,
        shopping: 0,
        health: 0,
        study: 0,
      },
      totalArchived: 0,
      dailyProgress: 0,
      streak: 0,
    };
  }

  const activeTasks = tasks.filter(t => !t.archived);
  const totalArchived = tasks.filter(t => t.archived).length;
  const total = activeTasks.length;
  const completed = activeTasks.filter(t => t.done).length;
  const completionPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  const byPriority: Record<TaskPriority, number> = {
    none: 0,
    low: 0,
    medium: 0,
    high: 0,
  };

  const byCategory: Record<TaskCategory, number> = {
    none: 0,
    work: 0,
    personal: 0,
    shopping: 0,
    health: 0,
    study: 0,
  };

  activeTasks.forEach(t => {
    if (byPriority[t.priority] !== undefined) {
      byPriority[t.priority]++;
    }
    if (byCategory[t.category] !== undefined) {
      byCategory[t.category]++;
    }
  });

  const completedToday = activeTasks.filter(
    t => t.done && isToday(t.completedAt),
  ).length;
  const pending = activeTasks.filter(t => !t.done).length;
  const dailyTotal = completedToday + pending;
  const dailyProgress =
    dailyTotal > 0 ? Math.round((completedToday / dailyTotal) * 100) : 0;

  const streak = calculateStreak(tasks);

  return {
    total,
    completed,
    completionPercentage,
    byPriority,
    byCategory,
    totalArchived,
    dailyProgress,
    streak,
  };
};

/**
 * Merges two lists of tasks resolving conflicts using the updatedAt timestamp.
 * This implements a "Last Write Wins" strategy at the individual task level.
 *
 * @param localTasks - Tasks from the local repository.
 * @param remoteTasks - Tasks from the remote repository.
 * @returns A merged list of tasks with conflicts resolved.
 */
export const mergeTasks = (localTasks: Task[], remoteTasks: Task[]): Task[] => {
  const taskMap = new Map<string, Task>();

  // Add all local tasks to the map
  localTasks.forEach(task => {
    taskMap.set(task.id, task);
  });

  // Merge remote tasks
  remoteTasks.forEach(remoteTask => {
    const existingTask = taskMap.get(remoteTask.id);

    if (!existingTask) {
      // New task from remote
      taskMap.set(remoteTask.id, remoteTask);
    } else {
      // Conflict: Compare timestamps
      const localUpdate = new Date(existingTask.updatedAt).getTime();
      const remoteUpdate = new Date(remoteTask.updatedAt).getTime();

      if (remoteUpdate > localUpdate) {
        // Remote is newer, overwrite local
        taskMap.set(remoteTask.id, remoteTask);
      }
      // If local is newer or same, keep local (already in map)
    }
  });

  return Array.from(taskMap.values());
};
