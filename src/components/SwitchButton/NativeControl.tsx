import * as React from 'react';

export interface NativeControlProps extends React.HTMLProps<HTMLInputElement> {
  rippleActivatorRef?: React.RefObject<HTMLInputElement>;
}

const NativeControl: React.FunctionComponent<NativeControlProps> = ({ rippleActivatorRef, ...otherProps }) => {
  return (
    <input
      type="checkbox"
      role="switch"
      className="mdc-switch__native-control"
      ref={rippleActivatorRef}
      {...otherProps}
    />
  );
};

NativeControl.defaultProps = {
  checked: false,
  disabled: false,
};

export default NativeControl;
