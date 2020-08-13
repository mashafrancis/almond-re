// react libraries
import React from 'react';

// third-party libraries
import { shallow } from 'enzyme';

// component
import TopBar from "./index";

describe('TopBar component', () => {
  const props = {
    photoImage: '',
    openProfileDialog: '',
    isActivityLogsEmpty: true,
  };

  const wrapper = shallow(<TopBar {...props} />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.mdc-top-app-bar')).toHaveLength(1);
  });
});
