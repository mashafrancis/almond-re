// react libraries
import React from 'react';

// third-party libraries
import * as Cookies from 'js-cookie';
import { screen } from '@testing-library/react';

// components
import AuthenticatedRoute from '.';
import { renderWithRouter } from '../../testHelpers';

describe('The AuthenticatedRoute component', () => {
  const TestComponent = () => <div>Test Component</div>;

  it('mounts the component if the user is authenticated', () => {
    const authToken = 'SOME_RANDOM_TOKEN';
    Cookies.set('jwt-token', authToken);
    renderWithRouter(<AuthenticatedRoute component={TestComponent} />);
    const elem = screen.getByTestId('authenticated-route');

    expect(elem.classList[0]).toBe('drawer-content');
    expect(screen.getByText('Test Component')).toBeTruthy();
  });

  it('redirects the user to root (/) if the user is NOT authenticated', () => {
    Cookies.remove('jwt-token');
    const redirectUrl = '/';
    const props = {
      location: {
        pathname: '/dashboard',
      },
    };
    const { history } = renderWithRouter(<AuthenticatedRoute component={TestComponent} {...props} />);

    expect(history.location.pathname).toEqual(redirectUrl);
  });
});
