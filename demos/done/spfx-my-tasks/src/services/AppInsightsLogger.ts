import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ILogger } from './ILogger';

export default class AppInsightsLogger implements ILogger {
  private _appInsights: ApplicationInsights;
  constructor() {
    this._appInsights = new ApplicationInsights({ config: {
      instrumentationKey: '99e8708a-aed3-431f-a22f-9f98d0466620'
    } });
    this._appInsights.loadAppInsights();
  }

  public log(message: string): void {
    this._appInsights.trackTrace({message: message});
  }

}
