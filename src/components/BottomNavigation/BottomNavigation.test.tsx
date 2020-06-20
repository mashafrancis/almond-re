// react libraries
import * as React from 'react';

// third-party libraries
import { shallow } from 'enzyme';

// components
import PageBottomNavigation from "./index";

describe.skip('BottomNavigation component', () => {
  const wrapper = shallow(<PageBottomNavigation />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
