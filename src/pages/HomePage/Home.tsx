import * as React from 'react';
import { connect } from 'dva';

export interface IAppProps {}

export interface IAppState {}

@connect(({ home }) => ({
  home
}))
export default class App extends React.Component<IAppProps, IAppState> {
  private constructor(props: IAppProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div>home</div>;
  }
}
