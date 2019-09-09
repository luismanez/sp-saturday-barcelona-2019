import { ITaskService } from "../../../services/ITaskService";
import { ITask } from "../../../models/ITask";

export interface IMyTasksProps {
  description: string;
  taskService: ITaskService;
}

export interface IMyTasksState {
  tasks: ITask[];
}
