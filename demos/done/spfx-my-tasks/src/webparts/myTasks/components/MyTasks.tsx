import * as React from 'react';
import styles from './MyTasks.module.scss';
import { IMyTasksProps } from './IMyTasksProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class MyTasks extends React.Component<IMyTasksProps, {}> {
  public render(): React.ReactElement<IMyTasksProps> {
    return (
      <div className={ styles.myTasks }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
