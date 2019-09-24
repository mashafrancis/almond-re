// react library
import * as React from 'react';

// third-party libraries
import { shallow } from 'enzyme';

// components
import Loader from '.';

describe('Loader component', () => {
  const wrapper = shallow(<Loader />);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the Loader component', () => {
    expect(wrapper.find('.loading').length).toEqual(1);
  });

  it('should render the loading bars', () => {
    expect(wrapper.find('.loading-bar').length).toEqual(4);
  });
});
