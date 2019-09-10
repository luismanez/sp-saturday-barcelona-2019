import * as React from 'react';
import styles from './Counter.module.scss';
import { ICounterProps, ICounterState } from './ICounterProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ICounterService } from '../../../services/ICounterService';
import { css, classNamesFunction, DefaultButton, IButtonProps, IStyle, Label, PrimaryButton } from 'office-ui-fabric-react';

export default class Counter extends React.Component<ICounterProps, ICounterState> {

  private _service: ICounterService;

  constructor(props: ICounterProps) {
    super(props);
    this.state = {
      count: 0
    };
    this._service = this.props.counterService;
    this._count = this._count.bind(this);
  }

  private _count(): void {
    const newCount = this._service.increaseAndReturnCount();
    this.setState({
      count: newCount
    });
  }

  public render(): React.ReactElement<ICounterProps> {
    return (
      <div className={styles.counter}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <PrimaryButton
                text="Count!"
                onClick={this._count}
              />
              <p>Count: {this.state.count}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
