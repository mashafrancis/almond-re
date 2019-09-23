// react libraries
import * as React from 'react';

// third party libraries
import { shallow } from 'enzyme';
// components
import Routes from './index';

describe.skip('The Route component', () => {
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
});
