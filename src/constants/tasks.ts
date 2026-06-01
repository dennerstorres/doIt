import {TaskPriority, TaskCategory} from '../types';

export const MIN_TASK_LENGTH = 3;
export const MAX_TASK_LENGTH = 50;

export const TASK_PRIORITIES: Record<string, TaskPriority> = {
  NONE: 'none',
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

export const TASK_CATEGORIES: Record<string, TaskCategory> = {
  NONE: 'none',
  WORK: 'work',
  PERSONAL: 'personal',
  SHOPPING: 'shopping',
  HEALTH: 'health',
  STUDY: 'study',
};
