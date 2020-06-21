// react libraries
import * as React from 'react';

// third-party libraries
import { shallow } from 'enzyme';

// component
import ActivityLogCard from "./index";

describe('ActivityLogCard component', () => {
  const props = {
    log: 'Pump broken',
    date: '2019-10-30T08:00:42.767Z',
    redirect: jest.fn(),
    classes: 'class',
    type: 'info'
  }

  const wrapper = shallow(<ActivityLogCard {...props} />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.log-card')).toHaveLength(1);
  });

  it('should render log details info when called', () => {
    expect(wrapper.find('.log-details-info')).toHaveLength(1);
    expect(wrapper.find('.log-details-error')).toHaveLength(0);
  });

  it('should render log details error when called', () => {
    const props = {
      log: 'Pump broken',
      date: '2019-10-30T08:00:42.767Z',
      type: 'error'
    }
    const wrapper = shallow(<ActivityLogCard {...props} />);
    expect(wrapper.find('.log-details-error')).toHaveLength(1);
    expect(wrapper.find('.log-details-info')).toHaveLength(0);
  });
});
