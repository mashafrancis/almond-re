import * as React from 'react';

export interface ModalProps {
  isModalOpen: boolean;
  renderHeader: () => React.ReactNode;
  renderContent: () => React.ReactNode;
  fullScreen?: boolean;
  onClose?: any;
  submitButtonName?: string;
  disabled?: boolean;
  onSubmit?: any;
  onDismiss?: any;
}
