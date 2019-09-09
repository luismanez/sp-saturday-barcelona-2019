import { ServiceKey } from '@microsoft/sp-core-library';
import { ICounterService } from './ICounterService';

export class DoubleCounterService implements ICounterService {

  private count: number = 1;

  public increaseAndReturnCount(): number {
    this.count = this.count * 2;
    return this.count;
  }
}

export const DoubleCounterServiceKey = ServiceKey.create<ICounterService>(
	'spfx-di-demo:DoubleCounterService',
	DoubleCounterService
);
