// jest mocks
import '../../../tests/__mocks__/snack';
import '../../../tests/__mocks__/storeWithPartialPermissions';

// react library
import * as React from 'react';

// third party libraries
import { shallow } from 'enzyme';

// components
import RestrictedRoute from '@components/RestrictedRoute';

describe.skip('The RestrictedRoute component', () => {
  let wrapper;
  const props = {
    fallbackView: null,
  };

  beforeEach(() => {
    wrapper = shallow(<RestrictedRoute path="/settings" component={() => <div />} {...props} />);
  });

  it('should render Route if authorize prop is not passed', () => {
    expect(wrapper.find('Route')).toHaveLength(1);
  });

  it('should render Route if user has the right access level', () => {
    wrapper.setProps({
      authorize: 'centers:view',
    });

    expect(wrapper.find('Route')).toHaveLength(1);
  });

  describe('When user does not have the right access level', () => {
    beforeEach(() => {
      wrapper.setProps({
        authorize: 'people:view',
      });
    });

    it('should not render Route component', () => {
      expect(wrapper.find('Route')).toHaveLength(0);
    });

    it('should render Redirect component', () => {
      expect(wrapper.find('Redirect')).toHaveLength(1);
    });

    it('should pass the "redirectTo" prop as the "to" prop to the Redirect component', () => {
      wrapper.setProps({
        redirectTo: '/analytics',
      });

      expect(wrapper.find('Redirect').props().to).toBe('/analytics');
    });

    it('should pass "/" as the "to" prop to Redirect if "redirectTo" prop is not passed', () => {
      expect(wrapper.find('Redirect').props().to).toBe('/');
    });
  });
});
