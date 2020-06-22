// react libraries
import * as React from 'react';

// third-party libraries
import { shallow } from 'enzyme';
import MenuContent from "./index";

// component

describe('MenuContent component', () => {
  const props = {
    name: 'name',
    photo: 'photo',
  };

  const wrapper = shallow(<MenuContent {...props} />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
