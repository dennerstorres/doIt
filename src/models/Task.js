/**
 * Task Model Factory
 *
 * Standardizes the task structure across the application.
 */

/**
 * Creates a new task object with a unique ID and default values.
 *
 * @param {string} text - The description of the task.
 * @returns {Object} A new task object.
 * @property {string} id - Unique identifier (timestamp based).
 * @property {string} task - The trimmed task description.
 * @property {boolean} done - Initial completion status (false).
 * @property {string} createdAt - ISO string of the creation date.
 */
export const createTask = text => {
  return {
    id: String(new Date().getTime()),
    task: text.trim(),
    done: false,
    createdAt: new Date().toISOString(),
  };
};

/**
 * Validates if an object follows the Task structure.
 *
 * @param {Object} taskObj - The object to validate.
 * @returns {boolean} True if valid.
 */
export const isValidTask = taskObj => {
  return (
    !!taskObj &&
    typeof taskObj.id === 'string' &&
    typeof taskObj.task === 'string' &&
    typeof taskObj.done === 'boolean'
  );
};
