import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';
import './index.less';

import { createHashHistory } from 'history';
import createLoading from 'dva-loading';
import FastClick from 'fastclick';

// 1. Initialize
const app = dva({
  history: createHashHistory()
});

// 2. Plugins
app.use(createLoading());

// 3. Register global model
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router/root').default);

// 5. Start
app.start('#app');

// 6. Load Other Libs
// require.ensure([], (require) => {

// });

FastClick.attach(document.body);

export default app._store;
