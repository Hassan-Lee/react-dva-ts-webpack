export const basicMenu = [
  {
    path: '/factory',
    name: '工厂数据化',
    shortName: '数据化',
    children: [
      {
        path: '/relation',
        name: '关系图谱'
      },
      {
        path: '/instance',
        name: '对象实例'
      },
      {
        path: '/template',
        name: '对象模板'
      },
      {
        path: '/gather',
        name: '数据集合'
      },
      {
        path: '/label-manager',
        name: '标签管理'
      }
    ]
  },
  {
    path: '/data',
    name: '数据加工',
    showName: '加工',
    children: [
      {
        path: '/dev-task',
        name: '开发任务'
      },
      {
        path: '/operations-center',
        name: '运维中心'
      },
      {
        path: '/resource',
        name: '资源'
      },
      {
        path: '/files',
        name: '文件'
      },
      {
        path: '/models',
        name: '模型'
      }
    ]
  },
  {
    path: '/data-service',
    name: '数据服务',
    shortName: '服务',
    children: []
  },
  {
    path: '/data-quality',
    name: '数据质量',
    shortName: '质量',
    children: []
  },
  {
    path: '/data-security',
    name: '数据安全',
    shortName: '安全',
    children: []
  }
  // {
  //   path: '/data-integration',
  //   name: '数据集成',
  //   children: [
  //     {
  //       path: '/data-source',
  //       name: '数据源'
  //     },
  //     {
  //       path: '/syncing-tasks',
  //       name: '获取同步任务'
  //     }
  //   ]
  // }
];
