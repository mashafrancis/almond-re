// react libraries
import * as React from 'react';

// third-party libraries
import { shallow } from 'enzyme';
import LinearProgressBar from "./index";

// component

describe('GeneralCardInfo component', () => {
  const props = {
  };

  const wrapper = shallow(<LinearProgressBar {...props} />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
