// react libraries
import * as React from 'react';
import { Redirect } from 'react-router-dom';

// third party libraries
import { displaySnackMessage } from '@modules/snack';

// components
import RestrictedRoute from '@components/RestrictedRoute';

// helper functions
import { authService } from '@utils/auth';

/**
 * Renders the component if the user is authenticated
 *
 * @param {Component} Component
 *
 * @returns {JSX}
 */
const renderComponent = Component => props => <Component { ...props } />;

const AuthenticatedRoute = props => {
  const { component: Component, ...rest } = props;

  if (!authService.isAuthenticated()) {
    localStorage.setItem('locationReferrer', props.location.pathname);
    displaySnackMessage('You need to login to continue');

    return (
      <>
        <Redirect to="/" />
      </>
    );
  }

  return (
  <div className="drawer-content">
    <RestrictedRoute { ...rest } render={renderComponent(Component)} />
  </div>
  );
};

export default AuthenticatedRoute;
