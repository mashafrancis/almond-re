import * as React from 'react';

/*
 * https://dev.to/n1ru4l/homebrew-react-hooks-useasynceffect-or-how-to-handle-async-operations-with-useeffect-1fa8
 */
const noop = () => {};

export const useAsyncEffect = (generator, deps = []) => {
  // store latest generator reference
  const generatorRef = React.useRef(generator);
  generatorRef.current = generator;

  React.useEffect(() => {
    let ignore = false;
    let onCancel = noop;

    const runGenerator = async () => {
      // create generator instance
      const instance = generatorRef.current((_onCancel) => {
        // allow specifying a onCancel handler
        // that can be used for aborting async operations
        // e.g. with AbortController
        // or simple side effects like logging
        // For usage: see example below
        onCancel = _onCancel || noop;
      });

      // generator result
      let res = { value: undefined, done: false };
      do {
        res = instance.next(res.value);
        try {
          // resolve promise
          res.value = await res.value;
        } catch (err) {
          try {
            // generator also allow triggering a throw
            // instance.throw will throw if there is no
            // try/catch block inside the generator function
            res = instance.throw(err);
          } catch (err) {
            // in case there is no try catch around the yield
            // inside the generator function
            // we propagate the error to the console
            console.error('Unhandled Error in useAsyncEffect: ', err);
          }
        }

        // abort further generator invocation on
        // 1. Unmount
        // 2. Dependency Array Change
        if (ignore) { return; }
      } while (res.done === false);
    };
    runGenerator();

    // Cleanup function that will be called on
    // 1. Unmount
    // 2. Dependency Array Change
    return () => {
      ignore = true;
      onCancel();
    };
  },              deps);
};
