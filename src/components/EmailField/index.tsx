import * as React from 'react';

// third party apps
import FormField from '@components/FormField';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';
import { validate } from 'isemail';

// interfaces
import { EmailFieldProps } from '@components/EmailField/interfaces';

const EmailField: React.FunctionComponent<EmailFieldProps> = (props) => {
  const { type, validator, ...rest } = props;

  const validateEmail = (value) => {
    if (!validate(value)) {
      throw new Error('Email is invalid');
    }
  };

  return (
    <FormField
      labelText="Email"
      type="text"
      leadingIcon={<EmailTwoToneIcon style={{ color: '#1967D2' }}/>}
      aria-describedby="email-helper-text"
      required
      validator={validateEmail}
      {...rest}
    />
  );
};

export default EmailField;
