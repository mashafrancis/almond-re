import React from 'react';

// components
import ActionButton from '@components/ActionButton';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

// interfaces
import { ModalProps } from '@components/Modal/interfaces';

// styles
import './Modal.scss';

const Modal = (props: ModalProps): JSX.Element => {
  const {
    isModalOpen,
    renderContent,
    fullScreen,
    onClose,
    renderHeader,
    submitButtonName,
    onSubmit,
    onDismiss,
  } = props;

  return (
    <Dialog
      open={isModalOpen}
      fullScreen={fullScreen}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">
        <p className="headline-3 modal-header">
          {renderHeader()}
        </p>
      </DialogTitle>
      <DialogContent className="modal-content">
        {renderContent()}
      </DialogContent>
      <DialogActions>
        <ActionButton
          name="Dismiss"
          handleClick={onDismiss}
        />
        <button
          className="mdc-button big-round-corner-button mdc-button--raised"
          onClick={onSubmit}>
              <span className="mdc-button__label">
                {submitButtonName}
              </span>
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
