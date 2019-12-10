// react libraries
import * as React from 'react';

// third party libraries
import { shallow } from 'enzyme';

// components
import Routes from './index';

describe('The Route components', () => {
  it('should register a route for the / page', () => {
    const wrapper = shallow(
      <Routes />
    );

    expect(wrapper.find({ path: '/' }).length).toBe(1);
  });

  it('should register a route for water cycles', () => {
    const wrapper = shallow(
      <Routes />
    );
    expect(wrapper.find({ path: '/water-cycles' }).length).toBe(1);
  });

  it('should register a route for adding new water schedule', () => {
    const wrapper = shallow(
      <Routes />
    );
    expect(wrapper.find({ path: '/water-cycles/schedule' }).length).toBe(1);
  });

  it('should register a route for editing a water schedule', () => {
    const wrapper = shallow(
      <Routes />
    );
    expect(wrapper.find({ path: '/water-cycles/edit/:id' }).length).toBe(1);
  });

  it('should register a route for 404', () => {
    const wrapper = shallow(
      <Routes />
    );
    expect(wrapper.find({ path: '/404' }).length).toBe(1);
  });
});
