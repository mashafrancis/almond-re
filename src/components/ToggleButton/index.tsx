// tslint:disable:prefer-const
// react libraries
import * as React from 'react';

// styles
import './ToggleButton.scss';

// interfaces
import { ToggleButtonProps } from './interfaces';

const ToggleButton = (props: ToggleButtonProps) => 
    <div className={props.classes}>
      <label className="switch">
        <input
          id="toggle-override"
          onChange={props.onChange}
          type="checkbox"
          checked={props.isChecked}
          />
        <span className="slider round" />
      </label>
    </div>
  ;

export default ToggleButton;

// export default React.memo(ToggleButton, (prevProps, nextProps) => {
//   return nextProps.isChecked !== prevProps.isChecked;
// });
