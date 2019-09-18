# sp-saturday-barcelona-2019
Slides y source code usados en mi sesión "Inyección de dependencias en Spfx, sí, se puede!", impartida en el SharePoint Saturday Barcelona 2019

__Nota__: Para hacer funcionar el proyecto My Tasks, debes crear un servicio de Application Insights en Azure, y editar el archivo _\src\services\AppInsightsLogger.ts_ con la Instrumentation Key generada en Azure

```ts
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
```
