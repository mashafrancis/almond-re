import { InputBaseProps } from '@material-ui/core';
import * as React from 'react';

export interface FormFieldProps {
  labelText?: any;
  // labelProps?: React.ReactNode;
  id?: string;
  // inputProps?: InputBaseProps;
  // inputRootCustomClasses?: string;
  // error?: boolean;
  // success?: boolean;
  // white?: boolean;
  // helperText?: string;
  label?: string;
  placeholder?: string;
  required: boolean;
  children?: React.ReactNode;
  validator?: any;
  onStateChanged?: any;
  leadingIcon?: any;
  type?: string;
  trailingIcon?: any;
  onLeadingIconSelect?: any;
  updateState?: any;
}

export interface FormFieldState {
  value: string;
  dirty: boolean;
  errors: any;
  name: string;
}
