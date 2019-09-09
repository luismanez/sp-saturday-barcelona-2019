import { ILogger } from "./ILogger";

export default class ConsoleLogger implements ILogger {

  public log(message: string): void {
    const currentDatetime = new Date();
    const formattedDate = `${currentDatetime.getFullYear()}-${(currentDatetime.getMonth() + 1)}-${currentDatetime.getDate()}`;
    const formattedTime = `${currentDatetime.getHours()}:${currentDatetime.getMinutes()}:${currentDatetime.getSeconds()}`;
    console.log("\x1b[32m%s\x1b[0m" ,`[SPSMAD] | ${formattedDate} ${formattedTime} | ${message}`);
  }

}
