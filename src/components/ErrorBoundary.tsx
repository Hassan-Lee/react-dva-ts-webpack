import React, { PureComponent } from 'react';

export interface IAppProps {}

export default class ErrorBoundary extends PureComponent<IAppProps> {
  private state = {
    hasError: false
  };

  private componentWillReceiveProps() {
    this.setState({ hasError: false });
  }

  private componentDidCatch() {
    this.setState({ hasError: true });
  }
  public render() {
    if (this.state.hasError) {
      return <div>出错啦</div>;
    } else {
      return this.props.children;
    }
  }
}
