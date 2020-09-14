// react libraries
import React from 'react';

// third-party libraries
import { render, screen } from "@testing-library/react";

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
        client: 'Francis Masha',
        deviceId: 'ABC123',
        date: '07 June 2018',
        id: 1,
        serialNumber: 'C0ABDJFGSKSJK',
        warranty: 'Expired',
      },
    ],
  };
  const { asFragment, getByTestId } = render(<Table {...props} />);

  it('should render correctly', () => {
    expect(asFragment()).toMatchSnapshot();

    const elem = screen.getByTestId('tbl-header');
    expect(elem.classList[0]).toBe('tbl-header');

    // expect(wrapper.find('.tbl-header__column--35').text()).toEqual('Client');
  });

  it.skip('should render header value if provided', () => {
    const elemKey = getByTestId('header-text');
    expect(elemKey.innerHTML).toBe('Client');

    const elemValue = screen.getByTestId('content-text');
    expect(elemValue.innerHTML).toBe('Francis Masha');

    // expect(wrapper).toMatchSnapshot();
    // expect(wrapper.find('.tbl-header__column--35').text()).toEqual('Francis Masha');
  });
});
