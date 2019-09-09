import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, EnvironmentType, Environment } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'CounterWebPartStrings';
import Counter from './components/Counter';
import { ICounterProps } from './components/ICounterProps';
import { ICounterService } from '../../services/ICounterService';
import { CounterServiceKey } from '../../services/CounterService';
import { DoubleCounterServiceKey } from '../../services/DoubleCounterService';

export interface ICounterWebPartProps {
  description: string;
}

export default class CounterWebPart extends BaseClientSideWebPart<ICounterWebPartProps> {

  public render(): void {

    //const counterServiceInstance: ICounterService = this.context.serviceScope.consume(CounterServiceKey);
    //const counterServiceInstance: ICounterService = this.context.serviceScope.consume(DoubleCounterServiceKey);
    let counterServiceInstance: ICounterService;
    switch (Environment.type) {
      case EnvironmentType.Local:
        counterServiceInstance = this.context.serviceScope.consume(CounterServiceKey);
        break;

      default:
        counterServiceInstance = this.context.serviceScope.consume(DoubleCounterServiceKey);
        break;
    }

    const element: React.ReactElement<ICounterProps> = React.createElement(
      Counter,
      {
        description: this.properties.description,
        counterService: counterServiceInstance
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
