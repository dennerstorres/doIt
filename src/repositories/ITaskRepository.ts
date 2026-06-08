import {Task} from '../types';

export interface ITaskRepository {
  getAll(): Promise<Task[]>;
  saveAll(tasks: Task[]): Promise<void>;
  sync(): Promise<void>;
}
