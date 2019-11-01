// react libraries
import * as React from 'react';

// third-party libraries
import { shallow } from 'enzyme';

import HomePage from './index';

describe.skip('Home Page', () => {
  const wrapper = shallow(<HomePage />);

  it('should be rendered properly', () => {
    expect(wrapper.find('button').exists).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render dashboard button which redirects to "/water-cycles', () => {
    expect(wrapper.find('a[href="/water-cycles"]')).toBeTruthy();
  });
});
