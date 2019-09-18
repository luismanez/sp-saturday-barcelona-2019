import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ILogger } from './ILogger';

export default class AppInsightsLogger implements ILogger {
  private _appInsights: ApplicationInsights;
  constructor() {
    this._appInsights = new ApplicationInsights({ config: {
      instrumentationKey: '[YOUR_APP_INSIGHTS_KEY]'
    } });
    this._appInsights.loadAppInsights();
  }

  public log(message: string): void {
    this._appInsights.trackTrace({message: message});
  }
}
