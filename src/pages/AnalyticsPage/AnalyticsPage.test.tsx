// react libraries
import React, { Suspense } from 'react';

// third party
import { screen } from '@testing-library/react';

// components
import { renderWithRouter } from '../../testHelpers';
import RegularUserAnalytics from './RegularUserAnalytics';
import AdminAnalytics from './AdminAnalytics';

const { asFragment } = renderWithRouter(
  <Suspense fallback={<h1>test loading</h1>}>
    <RegularUserAnalytics />
  </Suspense>,
);

describe('The Analytics Page', () => {
  it('should render Regular Analytics Page properly', () => {
    expect(asFragment()).toMatchSnapshot();

    const elem = screen.getByTestId('regular-analytics-page');
    expect(elem.classList[1]).toBe('analytics-page');
  });

  // it('should render Admin Analytics Page properly', () => {
  //   const { asFragment } = renderWithRouter(<AdminAnalytics />);
  //   expect(asFragment()).toMatchSnapshot();
  //
  //   const elem = screen.getByTestId('admin-analytics-page');
  //   expect(elem.classList[1]).toBe('analytics-page');
  // });
});
