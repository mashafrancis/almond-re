import * as React from 'react';

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
