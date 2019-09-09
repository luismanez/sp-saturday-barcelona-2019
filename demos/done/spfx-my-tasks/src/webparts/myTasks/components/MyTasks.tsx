import * as React from 'react';
import styles from './MyTasks.module.scss';
import { IMyTasksProps, IMyTasksState } from './IMyTasksProps';
import { ITaskService } from '../../../services/ITaskService';

export default class MyTasks extends React.Component<IMyTasksProps, IMyTasksState> {

  private _service: ITaskService;

  constructor(props: IMyTasksProps) {
    super(props);
    this.state = {
      tasks: []
    };
    this._service = this.props.taskService;
  }

  public componentDidMount(): void {
    this._service.getMyTasks().then(tasks => {
      this.setState({
        tasks: tasks
      });
    });
  }

  public render(): React.ReactElement<IMyTasksProps> {

    const tasks = <ul>{this.state.tasks.map(t => <li key={t.id}>{t.title} ({t.percentComplete}%) - {t.dueDateTime.toDateString()}</li>)}</ul>;

    return (
      <div className={ styles.myTasks }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>My Tasks</span>
              {tasks}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
