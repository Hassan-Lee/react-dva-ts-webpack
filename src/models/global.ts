export default modelEnhance({
  namespace: 'global',

  state: {
    userInfo: ''
  },

  effects: {
    *getMenu({ payload }, { call, put }) {
      const { status, data } = yield call(getMenu, payload);
      if (status) {
        const loopMenu = (menu, pitem = {}) => {
          menu.forEach(item => {
            if (pitem.path) {
              item.parentPath = pitem.parentPath
                ? pitem.parentPath.concat(pitem.path)
                : [pitem.path];
            }
            if (item.children && item.children.length) {
              loopMenu(item.children, item);
            }
          });
        };
        loopMenu(data);

        yield put({
          type: 'getMenuSuccess',
          payload: data
        });
      }
    }
  },

  reducers: {
    getMenuSuccess(state, { payload }) {
      return {
        ...state,
        menu: payload,
        flatMenu: getFlatMenu(payload)
      };
    }
  }
});
