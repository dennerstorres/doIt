/**
 * Task Utility Functions
 */

/**
 * Sorts tasks by completion status (done last) and then by creation date (newest first).
 *
 * @param {Array} tasks - The list of tasks to sort.
 * @returns {Array} The sorted list of tasks.
 */
export const sortTasks = tasks => {
  if (!Array.isArray(tasks)) {
    return [];
  }

  return [...tasks].sort((a, b) => {
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
 * Filters tasks based on their status.
 *
 * @param {Array} tasks - The list of tasks to filter.
 * @param {string} status - The status to filter by ('all', 'pending', 'completed').
 * @returns {Array} The filtered list of tasks.
 */
export const filterTasksByStatus = (tasks, status) => {
  if (!Array.isArray(tasks)) {
    return [];
  }

  switch (status) {
    case 'pending':
      return tasks.filter(t => !t.done);
    case 'completed':
      return tasks.filter(t => t.done);
    case 'all':
    default:
      return tasks;
  }
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
