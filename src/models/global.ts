import { basicMenu } from '../router/menu.config';
export default {
  namespace: 'global',

  state: {
    userInfo: '',
    global: 'test',
    basicMenu
  },
  effects: {
    *getMenu({}, { call }) {
      yield call();
    }
  },
  reducers: {}
};
