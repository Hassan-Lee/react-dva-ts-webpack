import React from 'react';
import { Layout, ConfigProvider } from 'antd';
import { connect } from 'dva';
import { Switch, Route } from 'react-router-dom';
import './Layout.less';
// import { Route, Switch } from 'dva/router';

import Authorized from '@utils/Authorized';
import GlobalHeader from '@components/Global/Header';
import SiderMenu from '@components/Sider/Menu';
// import Exception from '@components/Exception';
import ErrorBoundary from '@components/ErrorBoundary';

import styles from './Layout.less';

const { AuthorizedTab } = Authorized;
const { Content } = Layout;
// const redirectData = [];
// const Home = () => <div>Home</div>;
const NoMatch = () => <div>404</div>;
interface IAppProps {
  location: any;
  childRoutes: [];
  basicMenu: [];
}

interface IAppState {
  locale: undefined;
}

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
          <GlobalHeader />
          <Layout>
            <SiderMenu
              childRoutes={childRoutes}
              menuData={basicMenu}
              location={location}
            />
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
