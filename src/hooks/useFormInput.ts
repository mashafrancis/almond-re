import * as React from 'react';

export const useFormInput = (initialValue) => {
  const [value, setValue] = React.useState(initialValue);

  const handleChange = ({ target }) => setValue(target.value);

  return {
    value,
    onChange: handleChange,
  };
}
