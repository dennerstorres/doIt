import {TASK_PRIORITIES} from '../constants/tasks';

/**
 * Task Model Factory
 *
 * Standardizes the task structure across the application.
 */

/**
 * Creates a new task object with a unique ID and default values.
 *
 * @param {string} text - The description of the task.
 * @param {string} [priority=TASK_PRIORITIES.NONE] - The priority of the task.
 * @returns {Object} A new task object.
 * @property {string} id - Unique identifier (timestamp based).
 * @property {string} task - The trimmed task description.
 * @property {boolean} done - Initial completion status (false).
 * @property {string} priority - Task priority.
 * @property {string} createdAt - ISO string of the creation date.
 */
export const createTask = (text, priority = TASK_PRIORITIES.NONE) => {
  return {
    id: String(new Date().getTime()),
    task: text.trim(),
    done: false,
    priority,
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
