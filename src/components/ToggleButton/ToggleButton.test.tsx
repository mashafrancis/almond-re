// react libraries
import React from 'react';

// third-party libraries
import { shallow } from 'enzyme';

// component
import ToggleButton from "./index";

describe('ToggleButton component', () => {
  const props = {
    classes: ''
  };

  const wrapper = shallow(<ToggleButton {...props} />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.switch')).toHaveLength(1);
  });
});
