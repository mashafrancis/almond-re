import { ReactNode } from 'react';

export interface ModalProps {
  isModalOpen: boolean;
  renderHeader: () => ReactNode;
  renderContent: () => ReactNode;
  fullScreen?: boolean;
  onClose?: any;
  submitButtonName?: string;
  disabled?: boolean;
  onSubmit?: any;
  onDismiss?: any;
  innerRef?: any;
}
