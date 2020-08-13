// react library
import React from 'react';

// third-party libraries
import { shallow } from 'enzyme';

// components
import Loader from './index';

describe('Loader components', () => {
  const wrapper = shallow(<Loader />);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the Loader components', () => {
    expect(wrapper.find('.container').length).toEqual(1);
  });

  it('should render the loading bars', () => {
    expect(wrapper.find('.container').find('.dot').length).toEqual(3);
  });
});
