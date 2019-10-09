import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import _ from 'lodash';
import routerConfig from './route.config';

let routerDataCache: any;
interface C {
  namespace: string;
}
const modelNotExisted = (app: any, model: string) =>
  !app._models.some(({ namespace }: C) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic  ..
const dynamicWrapper = (app: any, models: [], component: any) => {
  return dynamic({
    app,
    models: () =>
      models
        .filter(model => modelNotExisted(app, model))
        .map(m => import(`../models/${m}.ts`)),
    component: () => {
      if (!routerDataCache) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        routerDataCache = getRouterData(app);
      }
      return component().then((raw: any) => {
        const Component = raw.default || raw;
        return (props: any) =>
          createElement(Component, {
            ...props
          });
      });
    }
  });
};

const formatterRouteData = (app: any, routes: any) => {
  return _.map(routes, route => {
    const { path, models, component, childRoutes = [] } = route;
    const dynamicRoute = {
      path,
      component: dynamicWrapper(app, models, component),
      childRoutes: childRoutes.length
        ? formatterRouteData(app, childRoutes)
        : []
    };
    return dynamicRoute;
  });
};

export const getRouterData = (app: any) => {
  return formatterRouteData(app, routerConfig);
};
