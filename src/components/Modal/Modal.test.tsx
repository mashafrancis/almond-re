// react libraries
import React from 'react';

// third-party libraries
import { render, screen } from "@testing-library/react";

// component
import Modal from "./index";

describe('AnalyticsCard component', () => {
  const props = {
    isModalOpen: false,
    renderHeader: () => 'Header',
    renderContent: () => 'Context'
  }

  it('should render correctly', () => {
    const { asFragment } = render(<Modal {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
