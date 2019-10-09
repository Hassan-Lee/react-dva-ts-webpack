const constants = require('./../constants');
const { resolve } = require('./../utils');

const cacheLoader = {
  loader: 'cache-loader',
  options: {
    // provide a cache directory where cache items should be stored
    cacheDirectory: resolve('.cache-loader')
  }
};

const threadLoader = workerParallelJobs => {
  const options = { workerParallelJobs };
  if (constants.APP_ENV === 'dev') {
    Object.assign(options, { poolTimeout: Infinity });
  }
  return { loader: 'thread-loader', options };
};

module.exports = {
  cacheLoader,
  threadLoader
};
