// react libraries
import React from 'react';

// third-party libraries
import { shallow } from 'enzyme';

// component
import DonutDisplay from "./index";

describe('DonutDisplay component', () => {
  const props = {
    data: [50, 60],
    donutInfo: '',
    hoverBackgroundColor: '#1967D2',
    backgroundColor: '#1967D2',
    halfDonut: true,
  };

  const wrapper = shallow(<DonutDisplay {...props} />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
