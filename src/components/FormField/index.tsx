import * as React from 'react';

// interfaces
import {
  FormFieldProps,
  FormFieldState
} from '@components/FormField/interfaces';

// components
import {
  InputAdornment,
  MenuItem,
  TextField
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

// styles
// import './FormField.scss';

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
    const {value} = e.target;
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
            { leadingIcon }
          </InputAdornment>,
        }}
        />
      // <TextField
      //   className="mdc-text-field--fullwidth"
      //   outlined
      //   label={labelText}
      //   leadingIcon={leadingIcon}
      //   onLeadingIconSelect={onLeadingIconSelect}
      //   trailingIcon={trailingIcon}
      //   helperText={
      //     <HelperText
      //       className="mdc-text-field-invalid-helper"
      //       isValidationMessage={hasErrors && errors[0]}
      //       persistent={hasErrors && errors[0]}
      //       validation={hasErrors && errors[0]}>
      //       {errors[0]}
      //     </HelperText>}
      // >
      //   <Input
      //     value={value || props.value}
      //     name={labelText}
      //     id={id}
      //     type={type}
      //     isValid={!(hasErrors && errors[0])}
      //     required={required}
      //     onChange={this.hasChanged}/>
      // </TextField>
    );
  }
}

export default FormField;
