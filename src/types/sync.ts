import {Task} from './task';

export type SyncType = 'SAVE_TASKS';

export interface SyncItem {
  id: string;
  type: SyncType;
  payload: Task[];
  createdAt: string;
}
