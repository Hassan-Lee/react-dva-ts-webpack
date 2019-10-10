import React from 'react';
import { routerRedux } from 'dva/router';
import { ConfigProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { HashRouter, Switch, Route } from 'react-router-dom';

import ErrorBoundary from '@components/ErrorBoundary';
import Authorized from '@utils/Authorized';
import { getRouterData } from '../router/router.ts';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" />;
});
const NoMatch = () => <div>404</div>;
const Root = (params: object) => {
  const { history, app } = params;
  const routerData = getRouterData(app);
  return (
    <HashRouter history={history}>
      <ConfigProvider locale={zhCN}>
        <ConnectedRouter history={history}>
          <ErrorBoundary>
            <Switch>
              {_.map(routerData, route => (
                <AuthorizedRoute key={route.path} {...route} />
              ))}
              <Route component={NoMatch} />
            </Switch>
          </ErrorBoundary>
        </ConnectedRouter>
      </ConfigProvider>
    </HashRouter>
  );
};

export default Root;
