import {TASK_PRIORITIES, TASK_CATEGORIES} from '../constants/tasks';

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
 * @param {string} [category=TASK_CATEGORIES.NONE] - The category of the task.
 * @param {string|null} [deadline=null] - The deadline of the task (ISO string).
 * @returns {Object} A new task object.
 * @property {string} id - Unique identifier (timestamp based).
 * @property {string} task - The trimmed task description.
 * @property {boolean} done - Initial completion status (false).
 * @property {string} priority - Task priority.
 * @property {string} category - Task category.
 * @property {string|null} deadline - Task deadline.
 * @property {string} createdAt - ISO string of the creation date.
 */
export const createTask = (
  text,
  priority = TASK_PRIORITIES.NONE,
  category = TASK_CATEGORIES.NONE,
  deadline = null,
) => {
  return {
    id: String(new Date().getTime()),
    task: text.trim(),
    done: false,
    priority,
    category,
    deadline,
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
    typeof taskObj.done === 'boolean' &&
    (typeof taskObj.category === 'string' || taskObj.category === undefined) &&
    (taskObj.deadline === null ||
      typeof taskObj.deadline === 'string' ||
      taskObj.deadline === undefined)
  );
};
