// react library
import { ReactNode } from 'react';
// jest mocks
import '../../../tests/__mocks__/storeWithPartialPermissions';
// third-party libraries
import { render, screen } from '@testing-library/react';
// components
import { Restrict } from '@components/Restrict';

describe('The Restrict component', () => {
	const props = {
		authorize: '',
		children: null,
		strict: false,
	};
	it('should render children prop if user has required access', () => {
		render(
			<Restrict authorize={['analytics:edit']}>
				<button className="button" data-testid="button" />
			</Restrict>,
		);

		const elem = screen.getByTestId('button');
		expect(elem).toHaveClass('button');
	});

	it.skip('should not render children prop if user does not have required access', () => {
		render(
			<Restrict authorize={['people:edit']}>
				<button className="button" data-testid="button" />
			</Restrict>,
		);

		const elem = screen.getByTestId('button');
		expect(elem.classList[0]).toBeFalsy();
	});

	it('should render fallback prop if user does not have required access', () => {
		render(
			<Restrict
				authorize={['people:edit']}
				fallback={<span className="span" data-testid="span" />}
			>
				<button />
			</Restrict>,
		);

		const elem = screen.getByTestId('span');
		expect(elem).toHaveClass('span');

		// expect(wrapper.find('span')).toHaveLength(1);
		// expect(wrapper.find('button')).toHaveLength(0);
	});
});
