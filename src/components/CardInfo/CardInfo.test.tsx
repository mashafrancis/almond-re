// react libraries
import React from 'react';

// third-party libraries
import { render, screen } from "@testing-library/react";

// component
import CardInfo from "./index";
import { WindowSize } from '../../testHelpers';

describe('CardInfo component', () => {
  const props = {
    mainHeader: 'mainHeader',
    subHeader: 'subHeader',
    buttonName: 'buttonName',
  };

  it('should render correctly', () => {
    const { asFragment } = render(<CardInfo {...props} />);
    expect(asFragment()).toMatchSnapshot();

    const elem = screen.getByTestId('header');
    expect(elem.innerHTML).toBe('mainHeader');
  });

  it('should render correctly with correct button on resize', () => {
    window.resizeTo(800, 300)
    render(<WindowSize />)
    const { asFragment } = render(<CardInfo {...props} />);

    expect(asFragment()).toMatchSnapshot();
    // const elem = screen.getByTestId('fab');
    //
    // expect(elem.innerHTML).toBe('mainHeader');
  });
});
