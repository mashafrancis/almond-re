// react libraries
import React from 'react';

// third-party libraries
import { render } from "@testing-library/react";

// component
import AreaChardDisplay from "./index";

describe('AreaChartDisplay component', () => {
  const props = {
    chartData: [15, 16, 20, 27, 21, 24, 21, 19, 16],
    chartColor: '#1967D2',
    backgroundColor: '#1967D2',
  };

  const { asFragment } = render(<AreaChardDisplay {...props} />);

  it('should render correctly', () => {
    expect(asFragment()).toMatchSnapshot();
  })
});
