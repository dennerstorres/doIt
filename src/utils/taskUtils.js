/**
 * Task Utility Functions
 */

/**
 * Sorting types constants
 */
export const SORT_TYPES = {
  DEFAULT: 'DEFAULT', // Status (unfinished first) + Date (newest first)
  DATE_DESC: 'DATE_DESC', // Newest first
  DATE_ASC: 'DATE_ASC', // Oldest first
  ALPHABETICAL: 'ALPHABETICAL', // A-Z
};

/**
 * Sorts tasks based on the specified sort type.
 *
 * @param {Array} tasks - The list of tasks to sort.
 * @param {string} sortType - The sorting strategy to use.
 * @returns {Array} The sorted list of tasks.
 */
export const sortTasks = (tasks, sortType = SORT_TYPES.DEFAULT) => {
  if (!Array.isArray(tasks)) {
    return [];
  }

  return [...tasks].sort((a, b) => {
    switch (sortType) {
      case SORT_TYPES.ALPHABETICAL:
        return a.task.localeCompare(b.task);

      case SORT_TYPES.DATE_ASC: {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateA - dateB;
      }

      case SORT_TYPES.DATE_DESC: {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateB - dateA;
      }

      case SORT_TYPES.DEFAULT:
      default: {
        // First, sort by status: unfinished first
        if (a.done !== b.done) {
          return a.done ? 1 : -1;
        }

        // Then, sort by creation date: newest first
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);

        // If creation dates are the same (or missing), use IDs as fallback
        if (dateA.getTime() === dateB.getTime()) {
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
 * @param {Array} tasks - The list of tasks to filter.
 * @param {string} search - The search term.
 * @returns {Array} The filtered list of tasks.
 */
export const filterTasksBySearch = (tasks, search) => {
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
 * Summarizes task statistics.
 *
 * @param {Array} tasks - The list of tasks.
 * @returns {Object} Statistics object with total and completed counts.
 */
export const getTaskStats = tasks => {
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  return {
    total: safeTasks.length,
    completed: safeTasks.filter(t => t.done).length,
  };
};
