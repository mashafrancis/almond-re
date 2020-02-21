export interface FormModalProps {
  isModalOpen: boolean;
  content: any;
  fullScreen?: boolean;
  onClose: any;
  title: string;
  submitButtonName: string;
  disabled?: boolean;
  onSubmit: any;
  onDismiss: any;
}
