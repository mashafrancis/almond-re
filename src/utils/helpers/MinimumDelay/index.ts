import * as delay from 'delay';

const minimumDelay = async (promise, minDelay, options?) => {
  options = {
    delayRejections: true,
    ...options,
  };

  let promiseError;

  if (options.delayRejections) {
    promise = promise.catch(error => promiseError = error);
  }

  const value = await Promise.all([promise, delay(minDelay)]);
  return promiseError ? Promise.reject(promiseError) : value[0];
};

export default minimumDelay;
