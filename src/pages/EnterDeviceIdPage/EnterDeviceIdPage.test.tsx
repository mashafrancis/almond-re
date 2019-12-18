// react libraries
import * as React from 'react';

// third-party libraries
import { mount } from 'enzyme';

import AddTimeScheduleForm from '@pages/AddTimeScheduleForm';

describe.skip('Add Time Schedule Form', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      addNewSchedule: jest.fn(),
      displaySnackMessage: jest.fn(),
    };
    wrapper = mount(<AddTimeScheduleForm { ...props } />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should be rendered properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
