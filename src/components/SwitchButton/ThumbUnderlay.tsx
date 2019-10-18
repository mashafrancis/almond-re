import { InjectedProps, withRipple } from '@material/react-ripple';
import classnames from 'classnames';
import * as React from 'react';

export interface ThumbUnderlayProps
  extends InjectedProps<HTMLDivElement, HTMLInputElement>,
    React.HTMLProps<HTMLDivElement> {
  rippleActivator: React.RefObject<HTMLInputElement>;
  initRipple: (surface: HTMLDivElement, activator?: HTMLInputElement) => void;
}

export class ThumbUnderlay extends React.Component<ThumbUnderlayProps, {}> {
  static defaultProps: Partial<ThumbUnderlayProps> = {
    className: '',
    // tslint:disable-next-line:no-empty
    initRipple: () => {},
    unbounded: true,
  };

  init = (el: HTMLDivElement) => {
    if (this.props.rippleActivator.current) {
      this.props.initRipple(el, this.props.rippleActivator.current);
    }
  }

  get classes() {
    return classnames('mdc-switch__thumb-underlay', this.props.className);
  }

  render() {
    const {
      children,
      /* eslint-disable */
      className,
      initRipple,
      unbounded,
      rippleActivator,
      /* eslint-enable */
      ...otherProps
    } = this.props;
    return (
      <div className={this.classes} ref={this.init} {...otherProps}>
        <div className="mdc-switch__thumb">{children}</div>
      </div>
    );
  }
}

export default withRipple<ThumbUnderlayProps, HTMLDivElement, HTMLInputElement>(
  ThumbUnderlay
);
