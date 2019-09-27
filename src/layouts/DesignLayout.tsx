import * as React from 'react';
// import { Route, Switch } from 'dva/router';
interface IAppProps {}

interface IAppState {}
export default class App extends React.Component<IAppProps, IAppState> {
  private constructor(props: IAppProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ width: '200px', background: 'green', height: '100%' }}>
          silder
        </div>
        <div style={{ flex: '1', background: '#ddd', height: '100%' }}>
          lalals
        </div>
      </div>
    );
  }
}
