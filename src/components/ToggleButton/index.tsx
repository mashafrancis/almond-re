// tslint:disable:prefer-const
// react libraries
import * as React from 'react';

// styles
import './ToggleButton.scss';

// interfaces
import { ToggleButtonProps } from './interfaces';

const ToggleButton = (props: ToggleButtonProps) => {
  return (
    <div className={props.classes}>
      <label className="switch">
        <input type="checkbox"/>
        <span className="slider round"/>
      </label>
    </div>
  );
};

export default ToggleButton;
