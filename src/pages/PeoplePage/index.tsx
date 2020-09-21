import React, { useState, useEffect, ChangeEvent, Suspense, lazy } from 'react';

// third-party libraries
import { Cell, Row } from '@material/react-layout-grid';
import { connect } from 'react-redux';
import { TextField, MenuItem, InputAdornment, Chip } from '@material-ui/core';
import LinearProgressBar from '@components/LinearProgressBar';

// icons
import { Face, PeopleAltOutlined, ExpandMore } from '@material-ui/icons';

// thunks
import { getAllPeople, updatePerson } from '@modules/people';
import { displaySnackMessage } from '@modules/snack';
import { getUserRoles } from '@modules/userRoles';

// styles
import './PeoplePage.scss';

// interfaces
import { useDashboardContainerStyles } from '@pages/DashboardContainer/styles';
import { PeoplePageProps, PeoplePageState } from './interfaces';

// component
const GeneralCardInfo = lazy(() => import('@components/GeneralCardInfo'));
const Modal = lazy(() => import('@components/Modal'));
const Table = lazy(() => import('@components/Table'));

export const PeoplePage = (props: PeoplePageProps) => {
	const [state, setState] = useState<PeoplePageState>({
		people: [],
		isFetchingRoles: false,
		isSelectOpen: false,
		roleSelect: 'User',
		roleId: '',
		userId: '',
	});

	const styles = useDashboardContainerStyles(props);

	useEffect(() => {
		const getAllPeople = async () => {
			await props.getAllPeople();
		};
		getAllPeople().then(() => setState({ ...state, people: props.people }));
	}, []);

	useEffect(() => {
		props
			.getUserRoles()
			.then(() => setState({ ...state, isFetchingRoles: false }));
	}, []);

	const toggleRoleSelectOpen = (event) => {
		event.persist();
		setState({
			...state,
			isSelectOpen: !state.isSelectOpen,
			userId: event.target.id,
		});
	};

	const handleRoleSelect = (event: ChangeEvent<HTMLInputElement>) => {
		const roleTitle = event.target.value;
		const role = props.roles.filter((obj) => obj.title === roleTitle);
		setState({ ...state, roleId: role[0]._id, roleSelect: roleTitle });
	};

	const handleChangeRole = (event) => {
		event.preventDefault();
		const { roleId, userId } = state;

		props.updatePerson(userId, { role: roleId }).then(() =>
			setState({
				...state,
				isSelectOpen: !state.isSelectOpen,
				userId: '',
			}),
		);
	};

	const userNamePhoto = (user) => (
		<span className="mini-username">
			<img className="mini-username__image" src={user[1].photo} alt="avatar" />
			<span>{user[1].name || 'Anonymous'}</span>
		</span>
	);
	const selectRoleContent = (roles) => (
		<TextField
			id="role"
			select
			variant="outlined"
			label="Assign user role"
			fullWidth
			size="small"
			value={state.roleSelect}
			onChange={handleRoleSelect}
			SelectProps={{
				classes: {
					selectMenu: styles.selectHeight,
				},
			}}
			InputLabelProps={{
				classes: {
					focused: styles.focused,
					root: styles.labelColor,
				},
			}}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<Face style={{ color: '#1967D2' }} />
					</InputAdornment>
				),
			}}
		>
			{roles.map((role) => (
				<MenuItem key={role._id} value={role.title}>
					<h4 className="headline-5">{role.title}</h4>
				</MenuItem>
			))}
		</TextField>
	);
	const SelectRoleModal = (roles) => (
		<Modal
			isModalOpen={state.isSelectOpen}
			renderHeader={() => 'Assign new role to user'}
			renderContent={() => selectRoleContent(roles)}
			onClose={toggleRoleSelectOpen}
			submitButtonName="Update role"
			onSubmit={handleChangeRole}
			onDismiss={toggleRoleSelectOpen}
		/>
	);
	const rolesSelectMore = (role, id) => (
		<div className="table-roles" id={id} onClick={toggleRoleSelectOpen}>
			<h6 id={id}>{role}</h6>
			<ExpandMore id={id} onClick={toggleRoleSelectOpen} />
		</div>
	);
	const TableContent = (users) => {
		const tableHeaders = {
			Name: { valueKey: 'name', colWidth: '40' },
			Devices: { valueKey: 'devices' },
			Role: { valueKey: 'role' },
			Status: { valueKey: 'status' },
		};

		const tableValues = users.map((user) => ({
			id: user[1]._id,
			name: userNamePhoto(user),
			devices: user[1].devices[0]?.id ?? '(Device not added)',
			role: rolesSelectMore(user[1].currentRole.title, user[1]._id),
			status: user[1].isVerified ? (
				<Chip className="MuiChip-root-enabled" label="Active" />
			) : (
				<Chip className="MuiChip-root-unverified" label="Inactive" />
			),
		}));

		return <Table keys={tableHeaders} values={tableValues} />;
	};

	return (
		<Row>
			<Cell columns={12} desktopColumns={12} tabletColumns={8} phoneColumns={4}>
				<GeneralCardInfo
					mainHeader="People"
					subHeader="List of all users under Almond"
					icon={
						<PeopleAltOutlined className="content-icon general-info-icon" />
					}
				/>
				<div className="user-roles-page__table">
					{TableContent(Object.entries(props.people))}
				</div>
				{SelectRoleModal(props.roles)}
			</Cell>
		</Row>
	);
};

export const mapStateToProps = (state) => ({
	people: state.people.people,
	roles: state.userRoles.roles,
});

export const mapDispatchToProps = (dispatch) => ({
	displaySnackMessage: (message) => dispatch(displaySnackMessage(message)),
	getAllPeople: () => dispatch(getAllPeople()),
	getUserRoles: () => dispatch(getUserRoles()),
	updatePerson: (id, role) => dispatch(updatePerson(id, role)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage);
