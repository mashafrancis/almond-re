import { useState } from 'react';

const useFormInput = (initialValue: any) => {
	const [value, setValue] = useState(initialValue);
	const handleChange = ({ target }) => setValue(target.value);

	return {
		value,
		onChange: handleChange,
	};
};

export default useFormInput;
