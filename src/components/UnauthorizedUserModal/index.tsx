// react
import * as React from 'react';

// third-party libraries
import { connect } from 'react-redux';

// components
import Button from '@components/Button';
import Modal from '@components/Modal';

// thunk action creators
import { logoutUser } from '@modules/user';

// interfaces
import { UnauthorizedUserModalProps } from '@components/UnauthorizedUserModal/interfaces';

export class UnauthorizedUserModal extends React.PureComponent<UnauthorizedUserModalProps> {
  /**
   * Logs the user out and reloads the page to refresh the app
   *
   * @returns {void}
   */
  logoutAndRedirectUser = () => {
    this.props.logoutUser();
    localStorage.removeItem('triedToAuthenticate');
    location.reload();
  }

  render() {
    return (
      <Modal
        isModalOpen={this.props.showModal}
        renderHeader={() => `Welcome, ${this.props.user && this.props.user.name || 'User'}`}
        renderContent={() => (
          <div>
            <p className="headline-4">
              You are currently not authorised to access Almond.
              Please contact almond.froyo@gmail.com for more details
            </p>
          </div>
        )}
        submitButtonName="OK"
        onSubmit={this.logoutAndRedirectUser}
        onDismiss={this.logoutAndRedirectUser}
      />
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user,
});

export const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnauthorizedUserModal);
