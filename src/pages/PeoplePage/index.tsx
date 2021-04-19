import { useState, useEffect, ChangeEvent } from 'react';
// third-party libraries
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { TextField, MenuItem, InputAdornment, Chip } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// icons
import { Face, ExpandMore } from '@material-ui/icons';
// components
import { DashboardCard } from '@components/molecules';
import { CustomLoadingOverlay } from '@pages/WaterCyclesPage';
import { NoDataOverlay } from '@components/atoms';
import Modal from '@components/atoms/Modal';
import {
	GridCellParams,
	GridColDef,
	DataGrid,
	GridSortDirection,
} from '@material-ui/data-grid';
// thunks
import { getAllPeople, updatePerson } from '@modules/people';
import { getUserRoles } from '@modules/userRoles';
// styles
import './PeoplePage.scss';
// interfaces
import { useDashboardContainerStyles } from '@pages/DashboardContainer/styles';
import useEffectAsync from '@hooks/useEffectAsync';
import { useTableStyles } from '@pages/WaterCyclesPage/styles';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { UserDetails } from '@modules/user/interfaces';
import { IRootState } from '../../store/rootReducer';
import { PeoplePageState } from './interfaces';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		margin: {
			margin: theme.spacing(1),
		},
		bottom: {
			position: 'fixed',
			bottom: 0,
			right: 0,
		},
	}),
);

export const PeoplePage = (): JSX.Element => {
	const { roles } = useSelector(
		(globalState: IRootState) => globalState.userRoles,
		shallowEqual,
	);
	const { people, isLoading } = useSelector(
		(globalState: IRootState) => globalState.people,
		shallowEqual,
	);
	const [state, setState] = useState<PeoplePageState>({
		people: [],
		isFetchingRoles: false,
		isSelectOpen: false,
		roleSelect: 'User',
		roleId: '',
		userId: '',
	});

	const dispatch = useDispatch();
	const classes = useStyles();
	const tableClasses = useTableStyles();

	const styles = useDashboardContainerStyles();

	useEffectAsync(async () => {
		await dispatch(getAllPeople());
	}, []);

	useEffect(() => {
		dispatch(getUserRoles());
	}, []);

	const toggleRoleSelectOpen = (event) => {
		event.persist();
		setState((prevState) => ({
			...prevState,
			isSelectOpen: !prevState.isSelectOpen,
			userId: event.target.id,
		}));
	};

	const handleRoleSelect = (event: ChangeEvent<HTMLInputElement>) => {
		const roleTitle = event.target.value;
		const role = roles.filter((obj) => obj.title === roleTitle);
		setState({ ...state, roleId: role[0]._id, roleSelect: roleTitle });
	};

	const handleChangeRole = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const { roleId, userId } = state;

		dispatch(updatePerson(userId, { role: roleId }));

		setState((prevState) => ({
			...prevState,
			isSelectOpen: !prevState.isSelectOpen,
			userId: '',
		}));
	};

	const selectRoleContent = () => (
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
						<Face color="primary" />
					</InputAdornment>
				),
			}}
		>
			{roles.map((role) => (
				<MenuItem key={role._id} value={role.title}>
					<Typography variant="body1">{role.title}</Typography>
				</MenuItem>
			))}
		</TextField>
	);

	const renderSelectRoleModal = () => (
		<Modal
			isModalOpen={state.isSelectOpen}
			renderHeader="Assign new role to user"
			renderContent={selectRoleContent()}
			onClose={toggleRoleSelectOpen}
			submitButtonName="Update role"
			onSubmit={handleChangeRole}
			onDismiss={toggleRoleSelectOpen}
		/>
	);

	const renderUserNamePhoto = ({ firstName, photo }) => (
		<span className="mini-username">
			<img className="mini-username__image" src={photo} alt="avatar" />
			<span>{firstName || 'Anonymous'}</span>
		</span>
	);

	const rolesSelectMore = ({ currentRole, _id }) => (
		<div className="table-roles" id={_id} onClick={toggleRoleSelectOpen}>
			<Typography
				style={{ cursor: 'pointer', paddingRight: 12 }}
				id={_id}
				variant="body2"
				// onClick={showDeviceModal('Edit')}
				// onKeyDown={showDeviceModal('Edit')}
			>
				{currentRole.title}
			</Typography>
			<ExpandMore id={_id} onClick={toggleRoleSelectOpen} />
		</div>
	);

	const renderActionButtons = (user: UserDetails): JSX.Element => {
		const { _id } = user;
		const handleDelete = () =>
			setState((prevState) => ({
				...prevState,
				userId: _id,
				// isSelectOpen: prevState.isSelectOpen,
			}));

		return (
			<div className={classes.root} key={_id}>
				<Grid container spacing={3}>
					<Grid
						container
						item
						xs={12}
						justify="flex-start"
						alignItems="center"
						direction="row"
						spacing={2}
						style={{ display: 'flex', width: '100%' }}
					>
						<Typography
							style={{ cursor: 'pointer', paddingRight: 12 }}
							id={_id}
							variant="body2"
							color="primary"
							// onClick={showDeviceModal('Edit')}
							// onKeyDown={showDeviceModal('Edit')}
						>
							Edit
						</Typography>
						<Typography
							style={{ cursor: 'pointer', color: red[900] }}
							id={_id}
							variant="body2"
							onClick={handleDelete}
							onKeyDown={handleDelete}
						>
							Delete
						</Typography>
					</Grid>
				</Grid>
			</div>
		);
	};

	const renderUserStatus = (user: UserDetails): JSX.Element => {
		const { isVerified } = user;
		if (isVerified) {
			return <Chip className="MuiChip-root-enabled" label="Active" />;
		}
		return <Chip className="MuiChip-root-unverified" label="Inactive" />;
	};

	const renderTableContent = () => {
		const users = Object.entries(people);

		const columns: GridColDef[] = [
			{
				field: 'name',
				headerName: 'Name',
				// width: 100,
				flex: 0.2,
				headerClassName: 'table-header',
				renderCell: ({ value }: GridCellParams) =>
					renderUserNamePhoto(value as UserDetails),
			},
			{
				field: 'id',
				headerName: 'User ID',
				// width: 100,
				flex: 0.2,
				headerClassName: 'table-header',
			},
			{
				field: 'devices',
				headerName: 'Devices',
				flex: 0.2,
				headerClassName: 'table-header',
			},
			{
				field: 'role',
				headerName: 'Role',
				flex: 0.2,
				headerClassName: 'table-header',
				renderCell: ({ value }: GridCellParams) =>
					rolesSelectMore(value as UserDetails),
			},
			{
				field: 'status',
				headerName: 'Status',
				flex: 0.2,
				headerClassName: 'table-header',
				renderCell: ({ value }: GridCellParams) =>
					renderUserStatus(value as UserDetails),
			},
			{
				field: 'actions',
				headerName: 'Actions',
				flex: 0.2,
				headerClassName: 'table-header',
				renderCell: ({ value }: GridCellParams) =>
					renderActionButtons(value as UserDetails),
			},
		];

		console.log(
			'Class: , Function: renderTableContent, Line 280 people():',
			people,
		);
		console.log(
			'Class: , Function: renderTableContent, Line 280 users():',
			users,
		);

		const rows = people.map((user: UserDetails) => ({
			id: user._id,
			name: user,
			devices: user.devices[0]?.id ?? '(Device not added)',
			role: user,
			status: user,
			actions: user,
		}));

		return (
			<div className={tableClasses.root} style={{ height: 700, width: '100%' }}>
				<div style={{ display: 'flex', height: '100%' }}>
					<div style={{ flexGrow: 1 }}>
						<DataGrid
							// autoHeight
							// autoPageSize
							// pagination
							className={tableClasses.root}
							loading={isLoading}
							rows={rows}
							pageSize={10}
							columns={columns.map((column) => ({
								...column,
								disableClickEventBubbling: true,
							}))}
							components={{
								LoadingOverlay: CustomLoadingOverlay,
								NoRowsOverlay: NoDataOverlay,
							}}
							sortModel={[
								{
									field: 'name',
									sort: 'asc' as GridSortDirection,
								},
							]}
						/>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className={classes.root} data-testid="user-roles-page">
			<Grid container item xs={12} style={{ margin: 0, padding: 0 }}>
				<Grid
					item
					container
					direction="column"
					justify="flex-start"
					alignItems="stretch"
					spacing={1}
					xs
					style={{ margin: 0, padding: 0 }}
				>
					{/* <GeneralCardInfo */}
					{/*	mainHeader="People" */}
					{/*	subHeader="List of all users under Almond" */}
					{/*	icon={ */}
					{/*		<PeopleAltOutlined className="content-icon general-info-icon" /> */}
					{/*	} */}
					{/* /> */}
					<DashboardCard
						heading="User Management"
						body={renderTableContent()}
					/>
					{renderSelectRoleModal()}
				</Grid>
			</Grid>
		</div>
	);
};

export default PeoplePage;
