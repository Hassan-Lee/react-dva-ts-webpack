import React, { PureComponent } from 'react';

interface IErrorProps {
  children?: any;
}

export default class ErrorBoundary extends PureComponent<IErrorProps> {
  private state = {
    hasError: false
  };

  private componentWillReceiveProps() {
    this.setState({ hasError: false });
  }

  private componentDidCatch() {
    this.setState({ hasError: true });
  }

  private render() {
    if (this.state.hasError) {
      return <div>出错啦</div>;
    } else {
      return this.props.children;
    }
  }
}
