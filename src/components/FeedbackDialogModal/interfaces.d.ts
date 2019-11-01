export interface FeedbackDialogProps {
  isFeedbackModal: boolean;
  action: string;
  onModalClose?: (action) => void;
  inputValue: string;
  handleFeedbackInputChange: any;
}

export interface FeedbackDialogState {
  isFeedbackModal: boolean;
  action: string;
}
