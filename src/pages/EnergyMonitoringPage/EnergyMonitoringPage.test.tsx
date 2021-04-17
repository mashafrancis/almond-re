// third party
import { render } from '@testing-library/react';
// components
import { EnergyMonitoringPage } from './index';

describe('The EnergyMonitoring Page', () => {
	const { asFragment } = render(<EnergyMonitoringPage />);

	it('should render properly', () => {
		expect(asFragment()).toMatchSnapshot();
	});

	// it('should render properly on mobile view', () => {
	//   const resizeWindow = (x: number, y: number) => {
	//     window.innerWidth = x;
	//     window.innerHeight = y;
	//     window.dispatchEvent(new Event('resize'));
	//   };
	//   resizeWindow(500, 300);
	//   expect(wrapper.find('.main-subheader')).toHaveLength(1);
	// });
});
