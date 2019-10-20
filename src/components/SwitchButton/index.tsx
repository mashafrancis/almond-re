import { MDCSwitchAdapter } from '@material/switch/adapter';
import { MDCSwitchFoundation } from '@material/switch/foundation';
import classnames from 'classnames';
import * as React from 'react';
import NativeControl from './NativeControl';
import ThumbUnderlay from './ThumbUnderlay';

export interface SwitchProps extends React.HTMLProps<HTMLInputElement> {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  nativeControlId?: string;
}

interface SwitchState {
  nativeControlChecked: boolean;
  checked: boolean;
  classList: Set<string>;
  disabled: boolean;
  nativeControlDisabled: boolean;
}

export default class Switch extends React.Component<SwitchProps, SwitchState> {

  get classes() {
    const { classList } = this.state;
    const { className } = this.props;
    return classnames('mdc-switch', Array.from(classList), className);
  }

  get adapter(): MDCSwitchAdapter {
    return {
      addClass: (className: string) => {
        const { classList } = this.state;
        classList.add(className);
        this.setState({ classList });
      },
      removeClass: (className: string) => {
        const { classList } = this.state;
        classList.delete(className);
        this.setState({ classList });
      },
      setNativeControlChecked: (nativeControlChecked: boolean) => {
        this.setState({ nativeControlChecked });
      },
      setNativeControlDisabled: (nativeControlDisabled: boolean) => {
        this.setState({ nativeControlDisabled });
      },
    };
  }

  static defaultProps: Partial<SwitchProps> = {
    checked: false,
    className: '',
    disabled: false,
  };
  rippleActivator: React.RefObject<HTMLInputElement> = React.createRef();
  foundation!: MDCSwitchFoundation;

  constructor(props: SwitchProps) {
    super(props);
    this.state = {
      checked: props.checked!,
      classList: new Set(),
      disabled: props.disabled!,
      nativeControlChecked: props.checked!,
      nativeControlDisabled: props.disabled!,
    };
  }

  componentDidMount() {
    this.foundation = new MDCSwitchFoundation(this.adapter);
    this.foundation.init();
    this.foundation.setChecked(this.props.checked!);
    this.foundation.setDisabled(this.props.disabled!);
  }

  componentDidUpdate(prevProps: SwitchProps) {
    if (this.props.checked !== prevProps.checked) {
      this.foundation.setChecked(this.props.checked!);
    }
    if (this.props.disabled !== prevProps.disabled) {
      this.foundation.setDisabled(this.props.disabled!);
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ nativeControlChecked: evt.target.checked });
    // tslint:disable-next-line:no-unused-expression
    this.foundation && this.foundation.handleChange(evt.nativeEvent);
  }

  render() {
    const {
      /* eslint-disable */
      className,
      checked,
      disabled,
      /* eslint-enable */
      form,
      nativeControlId,
      ...otherProps
    } = this.props;
    return (
      <div className={this.classes} {...otherProps}>
        <div className="mdc-switch__track"/>
        <ThumbUnderlay rippleActivator={this.rippleActivator}>
          <NativeControl
            id={nativeControlId}
            form={form}
            checked={this.state.nativeControlChecked}
            disabled={this.state.nativeControlDisabled}
            onChange={this.onChange}
            rippleActivatorRef={this.rippleActivator}
          />
        </ThumbUnderlay>
      </div>
    );
  }
}
