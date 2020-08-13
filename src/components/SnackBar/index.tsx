// react libraries
import React, { Component } from 'react';

// third-party libraries
import { Snackbar } from '@material/react-snackbar';
import { connect } from 'react-redux';

// interfaces
import { SnackMessageProps, SnackMessageState } from './interfaces';

import './SnackBar.scss';

export class SnackBar extends Component<
  SnackMessageProps,
  SnackMessageState
> {
  constructor(props) {
    super(props);

    this.state = {
      snack: this.props.snack,
    };
  }

  componentDidUpdate({ snack }) {
    if (this.props.snack !== snack) { this.setState(prevState => ({ ...prevState, snack: this.props.snack})); }
    if (this.state.snack.message !== '') { setTimeout(this.hideSnackMessage, 8000); }
  }

  private hideSnackMessage = () => this.setState({ snack: { message: '' }});

  render() {
    const { snack } = this.state;
    return (
      <>
        {
          snack.message
          ?
              <Snackbar
                message={snack.message}
                timeoutMs={8000}
                actionText="DISMISS"
                />

          : <div />
        }
      </>
    );
  }
}

export const mapStateToProps = state => ({
  snack: state.snack || { message: '' },
});

export default connect(mapStateToProps)(SnackBar);
