// react libraries
import * as React from 'react';

// third-party libraries
import { shallow } from 'enzyme';

// components
import Table from './index';

describe('Table components', () => {
  const props = {
    keys: {
      Client: { valueKey: 'client', colWidth: '35' },
      'Device Id': { valueKey: 'deviceId' },
      'Date Added': { valueKey: 'date' },
      'Serial Number': { valueKey: 'serialNumber' },
      Warranty: { valueKey: 'warranty' },
    },
    values:
    [
      {
        client: 'Masha',
        deviceId: 'ABC123',
        date: '07 June 2018',
        id: 1,
        serialNumber: 'C0ABDJFGSKSJK',
        warranty: 'Expired',
      },
    ],
  };
  const wrapper = shallow(<Table { ...props } />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.tbl-header__column--35').text()).toEqual('Client');
  });

  it('should render header value if provided', () => {
    wrapper.setProps({
      ...props,
      keys: { ...props.keys,
        Client: { ...props.keys.Client, value: 'Francis Masha' },
      },
    });

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.tbl-header__column--35').text()).toEqual('Francis Masha');
  });
});
