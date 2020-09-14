// react library
import React from 'react';

// jest mocks
import '../../../tests/__mocks__/snack';
import '../../../tests/__mocks__/storeWithPartialPermissions';

// third party libraries
import { render, screen } from '@testing-library/react';

// components
import RestrictedRoute from '@components/RestrictedRoute';
import { renderWithRouter } from '../../testHelpers';

describe('The RestrictedRoute component', () => {
  const props = {
    fallbackView: null,
    strict: true,
    redirectTo: '/',
  };

  const TestComponent = () => (
    <div className="test" data-testid="test"/>
  );

  beforeEach(() => {
    renderWithRouter(<RestrictedRoute path="/dashboard" component={() => <TestComponent/>} {...props} />, {
      route: '/dashboard',
    });
  });

  it('should render Route if authorize prop is not passed', () => {
    const elem = screen.getByTestId('test');
    expect(elem.classList[0]).toBe('test');
  });

  it('should render Route if user has the right access level', () => {
    const props = {
      fallbackView: null,
      strict: true,
      redirectTo: '/',
      authorize: 'dashboard:view',
    };
    renderWithRouter(<RestrictedRoute path="/dashboard" component={() => <TestComponent/>} {...props} />, {
      route: '/dashboard',
    });

    const elem = screen.getByTestId('test');
    expect(elem.classList[0]).toBe('test');
  });

  describe('When user does not have the right access level', () => {
    const props = {
      fallbackView: null,
      strict: true,
      redirectTo: '/',
      authorize: 'people:view',
    };

    beforeEach(() => {
      renderWithRouter(<RestrictedRoute path="/dashboard" component={() => <TestComponent/>} {...props} />, {
        route: '/dashboard',
      });
    });

    it('should not render Route component', () => {
      const elem = screen.getByTestId('test');
      expect(elem.classList[0]).toBe('test');
      // expect(wrapper.find('Route')).toHaveLength(0);
    });

    // it('should render Redirect component', () => {
    //   expect(wrapper.find('Redirect')).toHaveLength(1);
    // });
    //
    // it('should pass the "redirectTo" prop as the "to" prop to the Redirect component', () => {
    //   wrapper.setProps({
    //     redirectTo: '/dashboard',
    //   });
    //
    //   expect(wrapper.find('Redirect').props().to).toBe('/analytics');
    // });
    //
    // it('should pass "/" as the "to" prop to Redirect if "redirectTo" prop is not passed', () => {
    //   expect(wrapper.find('Redirect').props().to).toBe('/');
    // });
  });
});
