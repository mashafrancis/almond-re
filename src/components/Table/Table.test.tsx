// react libraries
import * as React from 'react';

// third-party libraries
import { shallow } from 'enzyme';

// components
import Table from 'components/Table';

describe('Table component', () => {
  const props = {
    keys: {
      Assignee: { valueKey: 'assignee', colWidth: '35' },
      'Asset Tag': { valueKey: 'assetTag' },
      'Date Added': { valueKey: 'date' },
      'Serial Number': { valueKey: 'serialNumber' },
      Warranty: { valueKey: 'warranty' },
    },
    values:
    [
      {
        assignee: 'Yaba',
        assetTag: 'AND/WEYA/WYRUHS',
        category: 'string',
        date: '07 June 2018',
        id: 1,
        serialNumber: 'C0ABDJFGSKSJK',
        warranty: 'Expired',
      },
    ],
  };
  const wrapper = shallow(
    <Table { ...props } />
  );

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.tbl-header__column--35').text()).toEqual('Assignee');
  });

  it('should render header value if provided', () => {
    wrapper.setProps({
      ...props,
      keys: { ...props.keys,
        Assignee: { ...props.keys.Assignee, value: 'Change Assignee' },
      },
    });

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.tbl-header__column--35').text()).toEqual('Change Assignee');
  });
});
