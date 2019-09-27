export default {
  namespace: 'global',

  state: {
    userInfo: '',
    global: 'test'
  },
  effects: {
    *getMenu({ payload }, { call, put }) {
      yield call();
      yield put({
        type: 'getMenuSuccess',
        payload
      });
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
};
