// react libraries
import * as React from 'react';

// third-party libraries
import { shallow } from 'enzyme';

// component
import AnalyticsCard from "./index";

describe('AnalyticsCard component', () => {
  const props = {
    mainInfo: 'mainInfo',
    subInfo: 'subInfo'
  }

  const wrapper = shallow(<AnalyticsCard {...props} />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.analytics-card')).toHaveLength(1);
  });
});
