// react libraries
import React from 'react';
// styles
import './ToggleButton.scss';
// interfaces
import { ToggleButtonProps } from './interfaces';

const ToggleButton = ({
	classes,
	onChange,
	isChecked,
	ariaLabel,
}: ToggleButtonProps): JSX.Element => (
	<div className={classes} data-testid="toggle-button">
		<label className="switch" aria-label={ariaLabel}>
			<input
				id="toggle-override"
				onChange={onChange}
				type="checkbox"
				checked={isChecked}
			/>
			<span className="slider round" />
		</label>
	</div>
);
export default ToggleButton;

// export default React.memo(ToggleButton, (prevProps, nextProps) => {
//   return nextProps.isChecked !== prevProps.isChecked;
// });
