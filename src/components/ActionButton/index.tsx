import React from 'react';

// interfaces
import { ActionButtonProps } from '@components/ActionButton/interfaces';

const ActionButton = (props: ActionButtonProps): JSX.Element => 
  <button className="mdc-button" onClick={props.handleClick}>
    {props.icon}
    <span className="mdc-button__label">{props.name}</span>
  </button>
;

export default ActionButton;
