import React from 'react';
import { routerRedux } from 'dva/router';
import { ConfigProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { HashRouter, Switch, Route } from 'react-router-dom';

import ErrorBoundary from '@components/ErrorBoundary';
import Authorized from '@utils/Authorized';
import { getRouterData } from './router.ts';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" />;
});
const NoMatch = () => <div>404</div>;
function RouterConfig(params) {
  const { history, app } = params;
  const routerData = getRouterData(app);
  const DesignLayout = routerData['/design'].component;
  const BasicLayout = routerData['/'].component;
  return (
    <HashRouter history={history}>
      <ConfigProvider locale={zhCN}>
        <ConnectedRouter history={history}>
          <ErrorBoundary>
            <Switch>
              <AuthorizedRoute
                path="/design"
                render={props => <DesignLayout {...props} />}
                authority={['user', 'admin']}
                redirectPath="/user/login"
              />
              <AuthorizedRoute
                path="/"
                render={props => <BasicLayout {...props} />}
                authority={['user', 'admin']}
                redirectPath="/user/login"
              />
              <Route component={NoMatch} />
            </Switch>
          </ErrorBoundary>
        </ConnectedRouter>
      </ConfigProvider>
    </HashRouter>
  );
}

export default RouterConfig;
