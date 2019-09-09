import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'MyTasksWebPartStrings';
import MyTasks from './components/MyTasks';
import { IMyTasksProps } from './components/IMyTasksProps';
import { AppStartup } from '../../startup/AppStartup';
import { ILogger } from '../../services/ILogger';
import { ITaskService } from '../../services/ITaskService';
import { LoggerKey, TaskServiceKey } from '../../services/ServiceKeys';

export interface IMyTasksWebPartProps {
  description: string;
}

export default class MyTasksWebPart extends BaseClientSideWebPart<IMyTasksWebPartProps> {

  private _logger: ILogger;
  private _taskService: ITaskService;

  constructor() {
    super();
  }

  public onInit(): Promise<any> {
    return super.onInit()
    .then(_ => AppStartup.configure(this.context, this.properties))
    .then(serviceScope => {
      this._logger = serviceScope.consume(LoggerKey);
      this._taskService = serviceScope.consume(TaskServiceKey);
    });
  }

  public render(): void {
    this._logger.log('Rendering my Tasks webpart...');

    const element: React.ReactElement<IMyTasksProps > = React.createElement(
      MyTasks,
      {
        description: this.properties.description,
        taskService: this._taskService
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
