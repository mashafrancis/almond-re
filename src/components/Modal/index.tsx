import * as React from 'react';

// components
import ActionButton from '@components/ActionButton';
import Button from '@components/Button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';

// interfaces
import { ModalProps } from '@components/Modal/interfaces';

const Modal: React.FunctionComponent<ModalProps> = (props) => {
  const {
    isModalOpen,
    renderContent,
    fullScreen,
    onClose,
    renderHeader,
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
        <p className="headline-3 modal-header">
          {renderHeader()}
        </p>
      </DialogTitle>
      <DialogContent className="register">
        {renderContent()}
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

export default Modal;
