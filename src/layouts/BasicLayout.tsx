import React from 'react';
import { Layout, ConfigProvider } from 'antd';
import { connect } from 'dva';
import { Switch, Route } from 'react-router-dom';
import './Layout.less';
// import { Route, Switch } from 'dva/router';

import Authorized from '@utils/Authorized';
import GlobalHeader from '@components/GlobalHeader';
import SiderMenu from '@components/SiderMenu';
// import Exception from '@components/Exception';
import ErrorBoundary from '@components/ErrorBoundary';

import styles from './Layout.less';

const { AuthorizedTab } = Authorized;
const { Content } = Layout;
// const redirectData = [];
// const Home = () => <div>Home</div>;
const NoMatch = () => <div>404</div>;
interface IAppProps {}

interface IAppState {}

class BasicLayout extends React.Component<IAppProps, IAppState> {
  private constructor(props: IAppProps) {
    super(props);

    this.state = {};
  }

  public render() {
    const { childRoutes, basicMenu, location } = this.props;
    return (
      <ConfigProvider locale={this.state.locale}>
        <Layout>
          <SiderMenu
            childRoutes={childRoutes}
            menu={basicMenu}
            location={location}
          />
          <Layout>
            <GlobalHeader />
            <ErrorBoundary>
              <Content className={styles.container} id="appContent">
                <Switch>
                  {_.map(childRoutes, route => (
                    <AuthorizedTab key={route.path} {...route} />
                  ))}
                  <Route component={NoMatch} />
                </Switch>
              </Content>
            </ErrorBoundary>
          </Layout>
        </Layout>
      </ConfigProvider>
    );
  }
}

export default connect(({ global }) => ({
  basicMenu: global.basicMenu
}))(BasicLayout);
