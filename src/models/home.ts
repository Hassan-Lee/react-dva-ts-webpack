export default {
  namespace: 'home',

  state: {
    userInfo: ''
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
        menu: payload
      };
    }
  }
};
