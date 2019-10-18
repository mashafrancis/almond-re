// tslint:disable:prefer-const
// react libraries
import * as React from 'react';

// styles
import './Button.scss';

// interfaces
import { ButtonProps } from './interfaces';

const Button = (props: ButtonProps) => {
  let {
    size,
    type,
    isActive,
    submit = false,
    isLoading = false,
    alignImageRight = true,
    disabled,
    classes,
    ...rest
  } = props;
  type = !type ? 'hollow' : type;
  size = !size ? 'regular' : size;
  isActive = isActive !== undefined ? isActive : false;

  const classNames = isActive
    ? `button active ${size} ${type}`
    : `button ${size} ${type}`;

  /**
   * This evaluates whether to show a spinner or the button content
   * depending on the button's isLoading state
   *
   * @param {ButtonProps} props
   *
   * @returns {JSX}
   */
  const renderButtonContent = (props) => {
    return alignImageRight
      ? (
          <React.Fragment>
            {props.name} {props.icon && <img src={props.icon} />}
          </React.Fragment>
        )
      : (
          <React.Fragment>
            {props.icon && <img src={props.icon} />} {props.name}
          </React.Fragment>
        );
  };

  const classList = `${
    classes
      ? `${classNames} ${classes}`
      : `${classNames}`
  } ${disabled ? 'disabled' : ''}`.trim();

  return (
    <button
      { ...rest }
      type={submit ? 'submit' : 'button'}
      id={props.id}
      disabled={disabled}
      className={classList}
      onClick={props.onClick}
      aria-label={props.aria_label}
    >
      {renderButtonContent(props)}
    </button>
  );
};

export default Button;
