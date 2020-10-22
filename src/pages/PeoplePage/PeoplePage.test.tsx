// react libraries
import { Suspense } from 'react';

// components
import { mapDispatchToProps, mapStateToProps, PeoplePage } from './index';
import { renderWithRouter } from '../../testHelpers';
import { props } from './fixtures';

describe('The People Page', () => {
	const { asFragment } = renderWithRouter(
		<Suspense fallback={<h1>test loading</h1>}>
			<PeoplePage {...props} />
		</Suspense>,
	);

	it('should render properly', () => {
		expect(asFragment()).toMatchSnapshot();
	});

	describe('mapStateToProps', () => {
		const state = {
			people: {
				people: [],
			},
			userRoles: {
				roles: [],
			},
		};

		const props = mapStateToProps(state);

		it('should map people page props from state', () => {
			expect(props.people).toEqual(state.people.people);
			expect(props.roles).toEqual(state.userRoles.roles);
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

		it('ensures getAllPeople is mapped to props', () => {
			props.getAllPeople();
			expect(dispatch).toHaveBeenCalled();
		});

		it('ensures getUserRoles is mapped to props', () => {
			props.getUserRoles();
			expect(dispatch).toHaveBeenCalled();
		});

		it('ensures updatePerson is mapped to props', () => {
			props.updatePerson();
			expect(dispatch).toHaveBeenCalled();
		});

		it('ensures displaySnackMessage is mapped to props', () => {
			props.displaySnackMessage();
			expect(dispatch).toHaveBeenCalled();
		});
	});
});
