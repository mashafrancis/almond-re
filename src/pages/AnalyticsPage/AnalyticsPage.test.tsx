// react libraries
import React from 'react';

// third party
import { screen } from '@testing-library/react';

// components
import { renderWithRouter } from '../../testHelpers';
import RegularUserAnalytics from './RegularUserAnalytics';
import AdminAnalytics from './AdminAnalytics';

describe('The Analytics Page', () => {
  it('should render Regular Analytics Page properly', () => {
    const { asFragment } = renderWithRouter(<RegularUserAnalytics />);
    expect(asFragment()).toMatchSnapshot();

    const elem = screen.getByTestId('regular-analytics-page');
    expect(elem.classList[1]).toBe('analytics-page');
  });

  it('should render Admin Analytics Page properly', () => {
    const { asFragment } = renderWithRouter(<AdminAnalytics />);
    expect(asFragment()).toMatchSnapshot();

    const elem = screen.getByTestId('admin-analytics-page');
    expect(elem.classList[1]).toBe('analytics-page');
  });
});
