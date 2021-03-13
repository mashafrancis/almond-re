import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// third-party libraries
import { connect, useDispatch } from 'react-redux';
import {
	InputAdornment,
	Chip,
	TextField,
	Button,
	IconButton,
	Divider,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Add, PhonelinkSetupSharp } from '@material-ui/icons';
// thunks
import {
	addNewDevice,
	deleteDevice,
	editDevice,
	getAllDevices,
} from '@modules/device';
// interfaces
import CardInfo from '@components/CardInfo';
import Modal from '@components/Modal';
import { Schedule } from '@modules/timeSchedules/interfaces';
import {
	GridCellParams,
	GridColDef,
	DataGrid,
	GridSortDirection,
} from '@material-ui/data-grid';
import { NoDataOverlay } from '@components/atoms';
import { CustomLoadingOverlay } from '@pages/WaterCyclesPage/Template';
import { ToggleSwitch, useTableStyles } from '@pages/WaterCyclesPage/styles';
import fancyId from '@utils/fancyId';
import { Device } from '@modules/device/interfaces';
import { UserContext } from '@context/UserContext';
import Grid from '@material-ui/core/Grid';
import DashboardCard from '@components/DashboardCard';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
// styles
import './DeviceManagementPage.scss';
import { useDashboardContainerStyles } from '@pages/DashboardContainer/styles';
import validate from 'validate.js';
import { DeviceManagementProps, DeviceManagementState } from './interfaces';
import { FormStateProps } from '../../types/FormStateProps';

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

const schema = {
	selectedDevice: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 7,
		},
	},
};

export const DeviceManagementPage = ({
	devices,
	activeDevice,
	isLoading,
}: DeviceManagementProps): JSX.Element => {
	const dispatch = useDispatch();
	const [state, setState] = useState<DeviceManagementState>({
		isEditMode: false,
		showDeviceModal: false,
		isFormModalOpen: false,
		devices: [],
		isDeleteModalOpen: false,
		deviceId: '',
		deviceToEdit: '',
		selectedDevice: '',
	});

	const [formState, setFormState] = useState<FormStateProps>({
		isValid: false,
		values: {},
		touched: {},
		errors: {},
	});

	const tableClasses = useTableStyles();
	const classes = useStyles();
	const styles = useDashboardContainerStyles();
	const {
		isFormModalOpen,
		isEditMode,
		selectedDevice,
		deviceToEdit,
		isDeleteModalOpen,
	} = state;

	useEffect(() => {
		dispatch(getAllDevices());
	}, [activeDevice]);

	useEffect(() => {
		const errors = validate(formState.values, schema);

		setFormState((formState) => ({
			...formState,
			isValid: !errors,
			errors: errors || {},
		}));
	}, [formState.values]);

	const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.persist();
		setFormState((formState) => ({
			...formState,
			values: {
				...formState.values,
				[event.target.name]:
					event.target.type === 'checkbox'
						? event.target.checked
						: event.target.value,
			},
			touched: {
				...formState.touched,
				[event.target.name]: true,
			},
		}));
	};

	const showDeviceModal = (mode) => (event) => {
		if (`show${mode}DeviceModal` && mode === 'Add') {
			setState((prevState) => ({
				...state,
				showDeviceModal: !prevState.showDeviceModal,
				isFormModalOpen: true,
				isEditMode: false,
			}));
		} else if (`show${mode}ScheduleModal` && mode === 'Edit') {
			const deviceId = event.target.id;
			const device = devices.filter((obj) => obj._id === deviceId);

			setState((prevState) => ({
				...state,
				deviceId,
				deviceToEdit: device[0].id,
				showDeviceModal: !prevState.showDeviceModal,
				isFormModalOpen: true,
				isEditMode: true,
			}));
		}
	};

	const closeDeviceModal = (): void => {
		if (state.isEditMode) {
			setState({
				...state,
				deviceToEdit: '',
				showDeviceModal: false,
				isFormModalOpen: false,
				deviceId: '',
			});
		}

		setState({
			...state,
			showDeviceModal: false,
			isFormModalOpen: false,
			deviceId: '',
		});
	};

	const toggleDeviceDeleteModal = (): void =>
		setState((prevState) => ({
			...prevState,
			isDeleteModalOpen: !prevState.isDeleteModalOpen,
		}));

	const handleDeviceDelete = async (event) => {
		event.preventDefault();
		await dispatch(deleteDevice(state.deviceId));
		toggleDeviceDeleteModal();
	};

	const onAddEditDeviceSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { isEditMode, deviceId, deviceToEdit } = state;

		if (formState.isValid) {
			const { selectedDevice } = formState.values;
			const device = {
				id: isEditMode ? deviceToEdit : selectedDevice,
			};
			dispatch(
				isEditMode ? editDevice(deviceId, device) : addNewDevice(device),
			);
		}

		setFormState((formState) => ({
			...formState,
			touched: {
				...formState.touched,
				...formState.errors,
			},
		}));

		closeDeviceModal();
	};

	const hasError = (field: string): boolean =>
		!!(formState.touched[field] && formState.errors[field]);

	const ActionButtons = (device: string): JSX.Element => {
		const handleDelete = () =>
			setState({
				...state,
				deviceId: device,
				isDeleteModalOpen: true,
			});
		return (
			<div className={classes.root} key={device}>
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
							id={device}
							variant="body2"
							color="primary"
							onClick={showDeviceModal('Edit')}
							onKeyDown={showDeviceModal('Edit')}
						>
							Edit
						</Typography>
						<Typography
							style={{ cursor: 'pointer', color: red[900] }}
							id={device}
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

	const deviceStatus = (device): JSX.Element => {
		const { verified, enabled } = device;
		if (!verified)
			return <Chip className="MuiChip-root-unverified" label="Not Verified" />;
		if (!enabled)
			return <Chip className="MuiChip-root-disabled" label="Disabled" />;
		return <Chip className="MuiChip-root-enabled" label="Enabled" />;
	};

	const TableContent = (devices: Device[]): JSX.Element => {
		const columns: GridColDef[] = [
			{
				field: 'deviceId',
				headerName: 'Device',
				// width: 100,
				flex: 0.2,
				headerClassName: 'table-header',
			},
			{
				field: 'id',
				headerName: 'Device ID',
				// width: 100,
				flex: 0.2,
				headerClassName: 'table-header',
			},
			{
				field: 'user',
				headerName: 'User',
				flex: 0.2,
				headerClassName: 'table-header',
			},
			{
				field: 'status',
				headerName: 'Status',
				flex: 0.2,
				headerClassName: 'table-header',
				renderCell: (params: GridCellParams) => deviceStatus(params.value),
			},
			{
				field: 'actions',
				headerName: 'Actions',
				flex: 0.2,
				headerClassName: 'table-header',
				renderCell: (params: GridCellParams) =>
					ActionButtons(params.value as string),
			},
		];

		const rows = devices.map((device) => ({
			id: device?._id ?? 'No ID',
			deviceId: device?.id ?? 'No device',
			user: device?.user
				? `${device?.user?.firstName} ${device?.user?.lastName}`
				: 'NOT ASSIGNED',
			status: device,
			actions: ActionButtons(device._id),
		}));

		return (
			<div className={tableClasses.root} style={{ height: 700, width: '100%' }}>
				<div style={{ display: 'flex', height: '100%' }}>
					<div style={{ flexGrow: 1 }}>
						<DataGrid
							autoHeight
							autoPageSize
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
									field: 'deviceId',
									sort: 'asc' as GridSortDirection,
								},
								{
									field: 'user',
									sort: 'asc' as GridSortDirection,
								},
							]}
						/>
					</div>
				</div>
			</div>
		);
	};

	const RenderDeviceForm = (): JSX.Element => (
		<TextField
			autoFocus
			fullWidth
			id="selectedDevice"
			variant="outlined"
			type="text"
			name="selectedDevice"
			// margin="dense"
			// size="small"
			label={`${isEditMode ? 'Update' : 'Add new'} device ID`}
			// value={formState.values.selectedDevice || ''}
			// defaultValue={isEditMode ? deviceToEdit : selectedDevice}
			onChange={handleValueChange}
			error={hasError('selectedDevice')}
			InputLabelProps={{
				classes: {
					focused: styles.focused,
					root: styles.labelColor,
				},
			}}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<IconButton>
							<PhonelinkSetupSharp />
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);

	const AddEditDeviceModal = (): JSX.Element => (
		<Modal
			isModalOpen={isFormModalOpen}
			renderContent={<RenderDeviceForm />}
			onClose={() => setState({ ...state, isFormModalOpen: false })}
			renderDialogText={
				isEditMode
					? 'Change the device identifier for the user to configure.'
					: 'Add a 7 digit device identifier for the user to configure.'
			}
			renderHeader={state.isEditMode ? 'Update device' : 'Add new device'}
			submitButtonName={isEditMode ? 'Update device' : 'Create new device'}
			onSubmit={onAddEditDeviceSubmit}
			onDismiss={closeDeviceModal}
		/>
	);

	const DeleteDeviceModal = (): JSX.Element => (
		<Modal
			isModalOpen={isDeleteModalOpen}
			renderDialogText="Do you confirm deletion of device?"
			onClose={toggleDeviceDeleteModal}
			renderHeader="Delete Device"
			submitButtonName="Delete"
			onSubmit={handleDeviceDelete}
			onDismiss={toggleDeviceDeleteModal}
		/>
	);

	return (
		<div className={classes.root} data-testid="device-management-page">
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
					{/* <CardInfo */}
					{/*	mainHeader="Device Management" */}
					{/*	subHeader="Add a new device to the database for the user" */}
					{/*	icon={<PhonelinkSetupSharp className="content-icon" />} */}
					{/*	buttonName="New device" */}
					{/*	onClick={showDeviceModal('Add')} */}
					{/* /> */}
					<DashboardCard
						heading="Device Management"
						body={TableContent(devices)}
						actionItem={
							<Button
								color="primary"
								size="small"
								variant="outlined"
								onClick={showDeviceModal('Add')}
							>
								<Add fontSize="small" />
								Add device
							</Button>
						}
					/>
				</Grid>
				<AddEditDeviceModal />
				<DeleteDeviceModal />
			</Grid>
		</div>
	);
};

export const mapStateToProps = (state) => ({
	devices: state.device.devices,
	activeDevice: state.device.activeDevice,
	isLoading: state.device.isLoading,
});

export default connect(mapStateToProps, null)(DeviceManagementPage);
