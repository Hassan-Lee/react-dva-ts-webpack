export default [
  {
    path: '/',
    models: ['global'],
    component: () => import('../layouts/BasicLayout'),
    childRoutes: [
      {
        path: '/home/:id?',
        models: ['home'],
        component: () => import('../pages/HomePage/Home')
      },
      {
        path: '/relationship',
        models: [],
        component: () => import('../pages/Factory/Relation')
      },
      {
        path: '/instance',
        models: [],
        component: () => import('../pages/Factory/Instance')
      },
      {
        path: '/template',
        models: [],
        component: () => import('../pages/Factory/Template')
      },
      {
        path: '/gather',
        models: [],
        component: () => import('../pages/Factory/Gather')
      },
      {
        path: '/label-manager',
        models: [],
        component: () => import('../pages/Factory/LabelManager')
      },
      {
        path: '/dev-task',
        models: [],
        component: () => import('../pages/Data/DevTask')
      },
      {
        path: '/operations-center',
        models: [],
        component: () => import('../pages/Data/OperationsCenter')
      },
      {
        path: '/resource',
        models: [],
        component: () => import('../pages/Data/Resource')
      },
      {
        path: '/files',
        models: [],
        component: () => import('../pages/Data/Files')
      },
      {
        path: '/models',
        models: [],
        component: () => import('../pages/Data/Models')
      },
      {
        path: '/data-service',
        models: [],
        component: () => import('../pages/DataService')
      },
      {
        path: '/data-security',
        models: [],
        component: () => import('../pages/DataSecurity')
      },
      {
        path: '/data-quality',
        models: [],
        component: () => import('../pages/DataQuality')
      },
      {
        path: '/data-source',
        models: [],
        component: () => import('../pages/DataIntegration/DataSource')
      },
      {
        path: '/syncing-tasks',
        models: [],
        component: () => import('../pages/DataIntegration/SyncingTasks')
      }
    ]
  },
  {
    path: '/design',
    models: ['global'],
    component: () => import('../layouts/DesignLayout')
  }
];
