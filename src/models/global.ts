import { basicMenu } from '../router/router';
export default {
  namespace: 'global',

  state: {
    userInfo: '',
    global: 'test',
    basicMenu
  },
  effects: {
    *getMenu({ payload }, { call, put }) {
      yield call();
    }
  },
  reducers: {}
};
