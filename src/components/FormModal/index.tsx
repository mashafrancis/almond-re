import ActionButton from '@components/ActionButton';
import * as React from 'react';

// components
import Button from '@components/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// interfaces
import { FormModalProps } from '@components/FormModal/interfaces';

const FormModal: React.FunctionComponent<FormModalProps> = (props) => {
  const {
    isModalOpen,
    content,
    fullScreen,
    onClose,
    title,
    submitButtonName,
    disabled,
    onSubmit,
    onDismiss,
  } = props;

  return (
    <Dialog
      open={isModalOpen}
      fullScreen={fullScreen}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        <p className="headline-3">
          {title}
        </p>
      </DialogTitle>
      <DialogContent className="register">
        {content}
      </DialogContent>
      <DialogActions>
        <ActionButton
          name="Dismiss"
          handleClick={onDismiss}
        />
        <Button
          type="button"
          name={submitButtonName}
          id="cc-roles"
          disabled={disabled}
          onClick={onSubmit}
          classes="mdc-button big-round-corner-button mdc-button--raised"
        />
      </DialogActions>
    </Dialog>
  );
};

export default FormModal;
