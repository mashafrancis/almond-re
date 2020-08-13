import React, { Component } from 'react';

// interfaces
import {
  FormFieldProps,
  FormFieldState,
} from '@components/FormField/interfaces';

// components
import {
  InputAdornment,
  TextField,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

const ValidationTextField = withStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '12px',
    '& input:valid + fieldset': {
      // borderColor: '#1967D2',
      borderWidth: 1,
    },
    '& input:invalid + fieldset': {
      borderColor: '#f44336',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderColor: '#1967D2',
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
  },
})(TextField);


export class FormField extends Component<FormFieldProps, FormFieldState> {
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
    const { value } = e.target;
    const name = e.target.id;
    const isEmpty = value.length === 0;
    const requiredMissing = this.state.dirty && required && isEmpty;

    let errors: string[] = [];

    if (requiredMissing) {
      errors = [...errors, `${labelText} is required`];
    } else if (typeof validator === 'function') {
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
      dirty: !dirty || dirty,
    }), () => onStateChanged(this.state));
  };

  render() {
    const { value, errors } = this.state;
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
      ...props
    } = this.props;
    const hasErrors = errors.length > 0;

    return (
      <ValidationTextField
        id={id}
        className="mdc-text-field--fullwidth"
        variant="outlined"
        label={labelText}
        fullWidth
        // required
        size="small"
        value={value || props.value}
        onChange={this.hasChanged}
        error={hasErrors && !!errors[0]}
        helperText={errors[0]}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">
            {leadingIcon}
          </InputAdornment>,
        }}
      />
    );
  }
}

export default FormField;
