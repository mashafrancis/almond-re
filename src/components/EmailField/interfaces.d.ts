import * as React from 'react';

export interface EmailFieldProps {
  validator?: any;
  label?: string;
  id: string;
  placeholder: string;
  required?: boolean;
  children?: React.ReactNode;
  onStateChanged?: any;
  type?: string;
}
