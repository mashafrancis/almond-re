import * as React from 'react';

// interfaces
import { FormFieldProps, FormFieldState } from '@components/FormField/interfaces';
// nodejs library to set properties for components
import TextField, { HelperText, Input } from '@material/react-text-field';

export class FormField extends React.Component<FormFieldProps, FormFieldState> {
  constructor(props) {
    super(props);
    this.state = {
      dirty: false,
      errors: [],
      value: '',
      name: '',
    };
  }

  hasChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { required, labelText, validator = f => f, onStateChanged = f => f } = this.props;
    const value = e.target.value;
    const name = e.target.id;
    const isEmpty = value.length === 0;
    const requiredMissing = this.state.dirty && required && isEmpty;

    let errors = [];

    if (requiredMissing) {
      errors = [...errors, `${labelText} is required`];
    } else if ('function' === typeof validator) {
      try {
        validator(value);
      } catch (e) {
        errors = [...errors, e.message];
      }
    }

    this.setState(({ dirty = false }) => ({
      value,
      errors,
      name,
      dirty: !dirty || dirty }), () => onStateChanged(this.state));
  }

  render() {
    const { value, dirty, errors } = this.state;
    const {
      type,
      label,
      required,
      labelText,
      leadingIcon,
      onLeadingIconSelect,
      trailingIcon,
      id,
      placeholder,
      children,
    } = this.props;
    const hasErrors = errors.length > 0;

    return (
      <TextField
        className="mdc-text-field--fullwidth"
        outlined
        label={labelText}
        leadingIcon={leadingIcon}
        onLeadingIconSelect={onLeadingIconSelect}
        trailingIcon={trailingIcon}
        helperText={
          <HelperText
            className="mdc-text-field-invalid-helper"
            isValidationMessage={hasErrors && errors[0]}
            persistent={hasErrors && errors[0]}
            validation={hasErrors && errors[0]}>
            {errors[0]}
          </HelperText>}
      >
        <Input
          value={value}
          name={labelText}
          id={id}
          type={type}
          isValid={!(hasErrors && errors[0])}
          required={required}
          onChange={this.hasChanged}/>
      </TextField>
    );
  }
}

export default FormField;
