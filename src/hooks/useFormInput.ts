import React, { useState } from 'react';

export const useFormInput = (initialValue) => {
	const [value, setValue] = useState(initialValue);

	const handleChange = ({ target }) => setValue(target.value);

	return {
		value,
		onChange: handleChange,
	};
};
