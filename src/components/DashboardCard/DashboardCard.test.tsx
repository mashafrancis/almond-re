// react libraries
import React from 'react';

// third-party libraries
import { shallow } from 'enzyme';
import DashboardCard from "./index";

// component

describe('DashboardCard component', () => {
  const props = {
    heading: '',
    body: '',
    redirect: () => jest.fn(),
    classes: '',
  };

  const wrapper = shallow(<DashboardCard {...props} />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.dashboard-card')).toHaveLength(1);
  });
});
