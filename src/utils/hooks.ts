import * as React from 'react';
import { useDispatch } from 'react-redux';
import * as Redux from 'redux';

export function useFormInput(initialValue) {
  const [value, setValue] = React.useState(initialValue);

  function handleChange({ target }) {
    setValue(target.value);
  }

  return {
    value,
    onChange: handleChange,
  };
}

const useActions = (actions, deps) => {
  const dispatch = useDispatch();
  return React.useMemo(() => {
    if (Array.isArray(actions)) {
      return actions.map(a => Redux.bindActionCreators(a, dispatch));
    }
    return Redux.bindActionCreators(actions, dispatch);
  },                   deps ? [dispatch, ...deps] : deps);
};
