import { ITask } from "../models/ITask";

export interface ITaskService {
  getMyTasks(): Promise<ITask[]>;
}

