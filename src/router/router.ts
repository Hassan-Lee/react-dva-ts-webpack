import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import _ from 'lodash';

let routerDataCache: any;
interface C {
  namespace: string;
}
const modelNotExisted = (app: any, model: string) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }:C) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic  ..
const dynamicWrapper = (app: any, models: [], component: any) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  // if (component.toString().indexOf('.then(') < 0) {
  //   models.forEach(model => {
  //     if (modelNotExisted(app, model)) {
  //       // eslint-disable-next-line
  //       app.model(require(`../models/${model}`).default);
  //     }
  //   });
  //   return props => {
  //     if (!routerDataCache) {
  //       // eslint-disable-next-line @typescript-eslint/no-use-before-define
  //       routerDataCache = getRouterData(app);
  //     }
  //     return createElement(component().default, {
  //       ...props,
  //       routerData: routerDataCache
  //     });
  //   };
  // }
  return dynamic({
    app,
    models: () =>
      models
        .filter(model => modelNotExisted(app, model))
        .map(m => import(`../models/${m}.ts`)),
    // add routerData prop
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

// const keyMap = {
//   factory: '../layouts/BasicLayout',
//   relationship: '',
//   instance: '',
//   data: '',
//   dvaTask: '',
//   operationsCenter: ''
// };

export const basicMenu = [
  {
    path: '/factory',
    name: '工厂数据化',
    children: [
      {
        path: '/relationship',
        name: '关系图谱'
      },
      {
        path: '/instance',
        name: '对象实例'
      }
    ]
  },
  {
    path: '/data',
    name: '数据加工',
    children: [
      {
        path: '/devTask',
        name: '开发任务'
      },
      {
        path: '/operationsCenter',
        name: '运维中心'
      }
    ]
  }
];

const routerConfig = [
  {
    path: '/',
    models: ['global'],
    component: () => import('../layouts/BasicLayout'),
    childRoutes: [
      {
        path: '/home/:id?',
        models: ['home'],
        component: () => import('../pages/HomePage/Home')
      }
    ]
  },
  {
    path: '/design',
    models: ['global'],
    component: () => import('../layouts/DesignLayout')
  }
];

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
