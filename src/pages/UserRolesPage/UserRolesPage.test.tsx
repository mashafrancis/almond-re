// react libraries
import React, { Suspense } from 'react';

// components
import { UserRolesPage, mapDispatchToProps, mapStateToProps } from './index';
import { renderWithRouter } from '../../testHelpers';
import { props } from './fixtures';

describe('The User Roles page', () => {
	const { asFragment } = renderWithRouter(
		<Suspense fallback={<h1>test loading</h1>}>
			<UserRolesPage {...props} />
		</Suspense>,
	);

	it('should render properly', () => {
		expect(asFragment()).toMatchSnapshot();
	});

	describe('mapStateToProps', () => {
		const state = {
			userRoles: {
				isLoading: true,
			},
		};

		const props = mapStateToProps(state);

		it('should map user roles page props from state', () => {
			expect(props.userRoles).toEqual(state.userRoles);
			expect(props.isLoading).toEqual(state.userRoles.isLoading);
		});
	});

	describe('mapDispatchToProps', () => {
		let dispatch;
		let props;

		beforeEach(() => {
			dispatch = jest.fn();
			props = mapDispatchToProps(dispatch) as any;
		});

		afterEach(() => {
			dispatch = props = null;
		});

		it('ensures getUserRoles is mapped to props', () => {
			props.getUserRoles();
			expect(dispatch).toHaveBeenCalled();
		});

		it('ensures createNewRole is mapped to props', () => {
			props.createNewRole();
			expect(dispatch).toHaveBeenCalled();
		});

		it('ensures deleteUserRole is mapped to props', () => {
			props.deleteUserRole();
			expect(dispatch).toHaveBeenCalled();
		});

		it('ensures editUserRole is mapped to props', () => {
			props.editUserRole();
			expect(dispatch).toHaveBeenCalled();
		});

		it('ensures displaySnackMessage is mapped to props', () => {
			props.displaySnackMessage();
			expect(dispatch).toHaveBeenCalled();
		});
	});
});
