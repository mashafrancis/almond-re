import * as React from 'react';

// export const useTimeout = (
//   callback: () => void,
//   timeout: number = 0,
// ): () => void => {
//   const timeoutIdRef = React.useRef<NodeJS.Timeout>();
//   const cancel = React.useCallback(() => {
//       const timeoutId = timeoutIdRef.current;
//       if (timeoutId) {
//         timeoutIdRef.current = undefined;
//         clearTimeout(timeoutId);
//       }
//     },
//     [timeoutIdRef],
//   );
//
//   React.useEffect(() => {
//       timeoutIdRef.current = setTimeout(callback, timeout);
//       return cancel;
//     },
//     [callback, timeout, cancel],
//   );
//
//   return cancel;
// }

export const useTimeout = (
  callback: () => void,
  timeout = 0,
  { persistRenders = false } = {},

  _setTimeout = setTimeout,
  _clearTimeout = clearTimeout,
  _useEffect = React.useEffect,
) => {
  let timeoutId;
  const cancel = () => timeoutId && _clearTimeout(timeoutId);

  _useEffect(
    () => {
      timeoutId = _setTimeout(callback, timeout);
      return cancel;
    },
    persistRenders
      ? [_setTimeout, _clearTimeout]
      : [callback, timeout, _setTimeout, _clearTimeout],
  );

  return cancel;
}
