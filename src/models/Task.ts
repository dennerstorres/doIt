import {TASK_PRIORITIES, TASK_CATEGORIES} from '../constants/tasks';
import {Task, TaskPriority, TaskCategory} from '../types';

/**
 * Task Model Factory
 *
 * Standardizes the task structure across the application.
 */

/**
 * Creates a new task object with a unique ID and default values.
 *
 * @param text - The description of the task.
 * @param priority - The priority of the task.
 * @param category - The category of the task.
 * @param deadline - The deadline of the task (ISO string).
 * @returns A new task object.
 */
export const createTask = (
  text: string,
  priority: TaskPriority = TASK_PRIORITIES.NONE as TaskPriority,
  category: TaskCategory = TASK_CATEGORIES.NONE as TaskCategory,
  deadline: string | null = null,
): Task => {
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
 * @param taskObj - The object to validate.
 * @returns True if valid.
 */
export const isValidTask = (taskObj: any): taskObj is Task => {
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
