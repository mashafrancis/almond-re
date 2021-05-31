import { useState, useEffect, ChangeEvent } from 'react';
// third-party libraries
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
	TextField,
	MenuItem,
	InputAdornment,
	Chip,
	Stack,
	Avatar,
	useMediaQuery,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme, useTheme } from '@material-ui/core/styles';
// icons
import { Face, ExpandMore } from '@material-ui/icons';
// components
import { DashboardCard } from '@components/molecules';
import { CustomLoadingOverlay } from '@pages/WaterCyclesPage';
import { CustomPagination, NoDataOverlay } from '@components/atoms';
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
		unverified: {
			color: '#1967d2',
			backgroundColor: 'rgba(66, 133, 244, 0.15)',
		},
		enabled: {
			color: '#0e5827',
			backgroundColor: 'rgba(14, 88, 39, 0.15)',
		},
		disabled: {
			color: '#821721',
			backgroundColor: 'rgba(210, 43, 53, 0.15)',
		},
		selectMore: {
			cursor: 'pointer',
			paddingRight: 12,
			[theme.breakpoints.down('sm')]: {
				fontSize: 12,
			},
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
	const themePoint = useTheme();

	const isSm = useMediaQuery(themePoint.breakpoints.down('sm'), {
		defaultMatches: true,
	});

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
					select: styles.selectHeight,
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

	const renderUserNamePhoto = ({ firstName, lastName, photo }) => (
		<Stack
			direction="row"
			spacing={1}
			justifyContent="center"
			alignItems="center"
		>
			<Avatar alt="avatar" sx={{ width: 30, height: 30 }} src={photo} />
			<span>{`${firstName} ${lastName}` ?? 'Anonymous'}</span>
		</Stack>
	);

	const rolesSelectMore = ({ currentRole, _id }) => (
		<div
			className={classes.root}
			id={_id}
			onClick={toggleRoleSelectOpen}
			role="presentation"
		>
			<Stack direction="row" spacing={1}>
				<ExpandMore id={_id} />
				<Typography className={classes.selectMore} id={_id} variant="body2">
					{currentRole.title}
				</Typography>
			</Stack>
		</div>
	);

	const renderActionButtons = ({ _id }: UserDetails): JSX.Element => {
		const handleDelete = () =>
			setState((prevState) => ({
				...prevState,
				userId: _id,
				// isSelectOpen: prevState.isSelectOpen,
			}));

		return (
			<div className={classes.root} key={_id}>
				<Stack direction="row" spacing={1}>
					<Typography
						className={classes.selectMore}
						id={_id}
						variant="body2"
						color="primary"
						// onClick={showDeviceModal('Edit')}
						// onKeyDown={showDeviceModal('Edit')}
					>
						Edit
					</Typography>
					<Typography
						className={classes.selectMore}
						style={{ cursor: 'pointer', color: red[900] }}
						id={_id}
						variant="body2"
						onClick={handleDelete}
						onKeyDown={handleDelete}
					>
						Delete
					</Typography>
				</Stack>
			</div>
		);
	};

	const renderUserStatus = (user: UserDetails): JSX.Element => {
		const { isVerified } = user;
		if (isVerified) {
			return <Chip className={classes.enabled} label="Active" />;
		}
		return <Chip className={classes.unverified} label="Inactive" />;
	};

	const renderTableContent = () => {
		const columns: GridColDef[] = [
			{
				field: 'name',
				headerName: 'Name',
				width: isSm ? 150 : undefined,
				flex: !isSm ? 0.15 : undefined,
				headerClassName: 'table-header',
				renderCell: ({ value }: GridCellParams) =>
					renderUserNamePhoto(value as UserDetails),
			},
			{
				field: 'id',
				headerName: 'User ID',
				width: isSm ? 150 : undefined,
				flex: !isSm ? 0.2 : undefined,
				// flex: 0.2,
				headerClassName: 'table-header',
			},
			{
				field: 'devices',
				headerName: 'Devices',
				width: isSm ? 150 : undefined,
				flex: !isSm ? 0.1 : undefined,
				headerClassName: 'table-header',
			},
			{
				field: 'role',
				headerName: 'Role',
				width: isSm ? 100 : undefined,
				flex: !isSm ? 0.1 : undefined,
				headerClassName: 'table-header',
				renderCell: ({ value }: GridCellParams) =>
					rolesSelectMore(value as UserDetails),
			},
			{
				field: 'status',
				headerName: 'Status',
				width: isSm ? 100 : undefined,
				flex: !isSm ? 0.1 : undefined,
				headerClassName: 'table-header',
				renderCell: ({ value }: GridCellParams) =>
					renderUserStatus(value as UserDetails),
			},
			{
				field: 'actions',
				headerName: 'Actions',
				width: isSm ? 150 : undefined,
				flex: !isSm ? 0.2 : undefined,
				headerClassName: 'table-header',
				renderCell: ({ value }: GridCellParams) =>
					renderActionButtons(value as UserDetails),
			},
		];

		const rows = people.map((user: UserDetails) => ({
			id: user._id,
			name: user,
			devices: user.devices[0]?.id ?? '(Device not added)',
			role: user,
			status: user,
			actions: user,
		}));

		return (
			<div style={{ height: 700, width: '100%' }}>
				<DataGrid
					// autoHeight
					// autoPageSize
					disableColumnMenu
					pagination
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
						// Pagination: CustomPagination,
					}}
					sortModel={[
						{
							field: 'name',
							sort: 'asc' as GridSortDirection,
						},
					]}
				/>
			</div>
		);
	};

	return (
		<div className={classes.root} data-testid="user-roles-page">
			<Grid container item xs={12} spacing={2}>
				<DashboardCard heading="User Management" body={renderTableContent()} />
				{renderSelectRoleModal()}
			</Grid>
		</div>
	);
};

export default PeoplePage;
