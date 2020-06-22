// react libraries
import * as React from 'react';

// third-party libraries
import { shallow } from 'enzyme';

// component
import MenuModal from "./index";

describe('MenuModal component', () => {
  const props = {
    content: ''
  };

  const wrapper = shallow(<MenuModal {...props} />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.feedback-menu')).toHaveLength(1);
  });
});
