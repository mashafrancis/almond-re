// react libraries
import React from 'react';
// third-party libraries
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
// component
import ActivityLogCard from './index';

describe('ActivityLogCard component', () => {
	let props;
	props = {
		log: 'Pump broken',
		date: '2019-10-30T08:00:42.767Z',
		redirect: jest.fn(),
		classes: 'class',
		type: 'info',
	};

	it('should render correctly', () => {
		const { asFragment } = render(<ActivityLogCard {...props} />);
		expect(asFragment()).toMatchSnapshot();

		const elemHeader = screen.getByTestId('header');
		expect(elemHeader.innerHTML).toBe('Pump broken');

		const elemDetails = screen.getByTestId('details');
		expect(elemDetails.innerHTML).toBe(dayjs(props.date).format('LLLL'));
	});

	it('should render log details info when called', () => {
		render(<ActivityLogCard {...props} />);
		const elemType = screen.getByTestId('type');

		expect(elemType.classList[0]).toBe('log-details-info');
	});

	it('should render log details error when called', () => {
		props = {
			log: 'Pump broken',
			date: '2019-10-30T08:00:42.767Z',
			type: 'error',
		};
		render(<ActivityLogCard {...props} />);
		const elemType = screen.getByTestId('type');

		expect(elemType.classList[0]).toBe('log-details-error');
	});
});
