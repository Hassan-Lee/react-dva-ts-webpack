import { basicMenu } from '../router/menu.config';
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
