// react libraries
// third party libraries
import { shallow } from 'enzyme';
import * as React from 'react';
// components
import Routes from './index';

describe('The Route components', () => {
  const wrapper = shallow(<Routes/>);

  it('should register a route for the / page', () => {
    expect(wrapper.find({ path: '/' }).length).toBe(1);
  });

  it('should register a route for water cycles', () => {
    expect(wrapper.find({ path: '/water-cycles' }).length).toBe(1);
  });

  it('should register a route for adding new water schedule', () => {
    expect(wrapper.find({ path: '/water-cycles/schedule' }).length).toBe(1);
  });

  it('should register a route for editing a water schedule', () => {
    expect(wrapper.find({ path: '/water-cycles/edit/:id' }).length).toBe(1);
  });

  it('should register a route for 404', () => {
    expect(wrapper.find({ path: '/404' }).length).toBe(1);
  });
});
