export type TaskPriority = 'none' | 'low' | 'medium' | 'high';

export type TaskCategory =
  | 'none'
  | 'work'
  | 'personal'
  | 'shopping'
  | 'health'
  | 'study';

export type TaskRepeat = 'none' | 'daily' | 'weekly' | 'monthly';

export interface Task {
  id: string;
  task: string;
  done: boolean;
  priority: TaskPriority;
  category: TaskCategory;
  repeat: TaskRepeat;
  archived: boolean;
  deadline: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  deleted: boolean;
}
