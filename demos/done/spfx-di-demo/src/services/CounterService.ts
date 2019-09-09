import { ServiceKey } from '@microsoft/sp-core-library';
import { ICounterService } from './ICounterService';

export class CounterService implements ICounterService {
  private count: number = 0;

  public increaseAndReturnCount(): number {
    return this.count++;
  }
}

export const CounterServiceKey = ServiceKey.create<ICounterService>(
	'spfx-di-demo:CounterService',
	CounterService
);
