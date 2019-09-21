// react libraries
import * as React from 'react';

// third-party libraries
import { Snackbar } from '@material/react-snackbar';
import { connect } from 'react-redux';

// styles
// import './SnackBar.scss';

// interfaces
import { SnackMessageProps, SnackMessageState } from './interfaces';

export class SnackBar extends React.Component<
  SnackMessageProps,
  SnackMessageState
> {
  constructor(props) {
    super(props);

    this.state = {
      snack: this.props.snack,
    };
  }

  componentDidUpdate({ snack: snack }) {
    if (this.props.snack !== snack) {
      this.setState({ snack: this.props.snack });
    }

    /*
     * This lifecycle is called for updates to both state and props, hence the need to
     * avoid infinite recursion; if toast type is already '',
     * hideToastMessage has already been called.
     */
    if (this.state.snack.message !== '') {
      setTimeout(this.hideSnackMessage, 6000);
    }
  }

  private hideSnackMessage = () => {
    this.setState({
      snack: {
        message: '',
        withName: false,
      },
    });
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.snack.message
          ? (
              <Snackbar
                message={this.state.snack.message}
                timeoutMs={6000}
                actionText="DISMISS"
              />
            )
          : (<div />)
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  snack: state.snack || { message: '' },
});

export default connect(mapStateToProps)(SnackBar);
