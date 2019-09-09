import { ServiceScope, Environment, EnvironmentType } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import MockTaskService from "../services/MockTaskService";
import ConsoleLogger from "../services/ConsoleLogger";
import { LoggerKey, TaskServiceKey } from "../services/ServiceKeys";

export class AppStartup {

  public static configure(ctx: WebPartContext, props: any): Promise<ServiceScope> {

    switch (Environment.type) {
      case EnvironmentType.SharePoint:
      case EnvironmentType.ClassicSharePoint:
        return AppStartup.configureForSharePointContext(ctx, props);
      default:
        return AppStartup.configureForLocalOrTestContext(ctx, props);
    }
  }

  private static configureForSharePointContext(ctx: WebPartContext, props: any): Promise<ServiceScope> {
    return new Promise<any>((resolve, reject) => {
      ctx.serviceScope.whenFinished(() => {

        // Proper place to configure things (i.e: PnP JS lib),
        // or using webpart props for other setup...
        // pnp.setup({
        //   spfxContext: ctx
        // });
        // const whatever = props['WebPartProperty1']

        // NOTE here we are using the global scope (default registrations: GraphTaskService & AppInsightsLogger)

        resolve(ctx.serviceScope);
      });
    });
  }

  private static configureForLocalOrTestContext(ctx: WebPartContext, props: any): Promise<ServiceScope> {
    return new Promise<any>((resolve, reject) => {
      // Here create a dedicated service scope for test or local context
      const childScope: ServiceScope = ctx.serviceScope.startNewChild();

      // Register the services that will override default implementation
      childScope.createAndProvide(LoggerKey, ConsoleLogger);
      childScope.createAndProvide(TaskServiceKey, MockTaskService);

      // Must call the finish() method to make sure the child scope is ready to be used
      childScope.finish();

      childScope.whenFinished(() => {
        // If other services are required, it must be done HERE. i.e:
        //AppStartup.serviceScope = childScope;

        resolve(childScope);
      });
    });
  }

}
