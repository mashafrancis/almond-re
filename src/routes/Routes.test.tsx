// react libraries
import * as React from 'react';

// third party libraries
import { shallow } from 'enzyme';

// components
import Routes from './index';

describe('The Route components', () => {
  const wrapper = shallow(<Routes/>);

  it('should register a route for the / page', () => {
    expect(wrapper.find({ path: '/' }).length).toBe(1);
  });

  it('should register a route for dashboard', () => {
    expect(wrapper.find({ path: '/dashboard' }).length).toBe(1);
  });

  it('should register a route for 404', () => {
    expect(wrapper.find({ path: '/404' }).length).toBe(1);
  });
});
