import * as React from 'react';

// third party libraries
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle
} from '@material/react-dialog';
import TextField, {
  HelperText,
  Input
} from '@material/react-text-field';

// interfaces
import { FeedbackDialogProps, FeedbackDialogState } from './interfaces';

const FeedbackDialogModal = (props: FeedbackDialogProps) => {
  const [state, setState] = React.useState<FeedbackDialogState>({
    isFeedbackModal: false,
    action: '',
  });

  const {
    isFeedbackModal,
    inputValue,
    handleFeedbackInputChange,
  } = props;

  React.useEffect(() => {
    switch (state.action) {
      case 'send':
        setState({ ...state, isFeedbackModal });
        break;
      case 'dismiss':
        setState({ ...state, isFeedbackModal });
        break;
    }
  },              []);

  return (
    <Dialog
      open={ isFeedbackModal }
      onClose={ action => setState({ ...state, action, isFeedbackModal: false }) }
    >
      <DialogTitle>Send feedback</DialogTitle>
      <DialogContent>
        <TextField
          className="mdc-text-field--fullwidth"
          textarea={true}
          helperText={
            <HelperText
              className="mdc-text-field-invalid-helper"
              isValidationMessage={true}
              persistent={true}
              validation={true}>
              {'Share your ideas'}
            </HelperText>}
        >
          <Input
            value={inputValue}
            name="feedback"
            id="1"
            type="text"
            required={false}
            onChange={handleFeedbackInputChange}/>
        </TextField>
      </DialogContent>
      <DialogFooter>
        <DialogButton action="dismiss">CANCEL</DialogButton>
        <DialogButton action="send" isDefault>SEND</DialogButton>
      </DialogFooter>
    </Dialog>
  );
};

export default FeedbackDialogModal;
