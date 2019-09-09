import { ITaskService } from "./ITaskService";
import { ITask } from "../models/ITask";
import { ServiceScope } from "@microsoft/sp-core-library";
import { MSGraphClientFactory, MSGraphClient } from "@microsoft/sp-http";
import { ILogger } from "./ILogger";
import { LoggerKey } from "./ServiceKeys";

export default class GraphTaskService implements ITaskService {

  private _msGraphClientFactory: MSGraphClientFactory;
  private _logger: ILogger;

  constructor(serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {
      this._msGraphClientFactory = serviceScope.consume(MSGraphClientFactory.serviceKey);
      this._logger = serviceScope.consume(LoggerKey);
    });
  }

  public async getMyTasks(): Promise<ITask[]> {
    this._logger.log("Getting my Tasks from Graph API...");
    const graphClient: MSGraphClient = await this._msGraphClientFactory.getClient();
    const data = await graphClient.api('me/planner/tasks').get();
    const tasks: ITask[] = data.value.map(t => {
      const task: ITask = {
        id: t.id,
        title: t.title,
        dueDateTime: new Date(t.dueDateTime),
        percentComplete: t.percentComplete
      };
      return task;
    });

    return tasks;
  }
}
