import { ICounterService } from "../../../services/ICounterService";

export interface ICounterProps {
  description: string;
  counterService: ICounterService;
}

export interface ICounterState {
  count: number;
}
