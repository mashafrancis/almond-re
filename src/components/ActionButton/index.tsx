import * as React from 'react';

// components
import MaterialIcon from '@material/react-material-icon';

// interfaces
import { ActionButtonProps } from '@components/ActionButton/interfaces';

const ActionButton: React.FunctionComponent<ActionButtonProps> = props => (
  <button className="mdc-button" onClick={props.handleClick}>
    <MaterialIcon
      hasRipple icon={props.icon}
      initRipple={null}
    />
    <span className="mdc-button__label">{props.name}</span>
  </button>
);

export default ActionButton;
