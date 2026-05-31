export type TaskPriority = 'none' | 'low' | 'medium' | 'high';

export type TaskCategory =
  | 'none'
  | 'work'
  | 'personal'
  | 'shopping'
  | 'health'
  | 'study';

export interface Task {
  id: string;
  task: string;
  done: boolean;
  priority: TaskPriority;
  category: TaskCategory;
  deadline: string | null;
  createdAt: string;
}
