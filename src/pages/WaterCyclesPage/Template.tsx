import React, {
	useState,
	useEffect,
	useContext,
	createRef,
	lazy,
	Suspense,
} from 'react';
// third-party libraries
import { Cell, Row } from '@material/react-layout-grid';
import { useMqttState, useSubscription } from 'mqtt-hooks';
import ActionButton from '@components/ActionButton';
import DateFnsUtils from '@date-io/date-fns';
import { IconButton, InputAdornment, Switch } from '@material-ui/core';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import withStyles from '@material-ui/core/styles/withStyles';
// icons
import {
	BlurCircular,
	ScheduleTwoTone,
	AddAlarmTwoTone,
	ArrowDropDown,
	DateRange,
} from '@material-ui/icons';
import { ComponentContext } from '@context/ComponentContext';
import { UserContext } from '@context/UserContext';
import LinearProgressBar from '@components/LinearProgressBar';
// utils
import validateOneHourTime from '@utils/validateTimeOneHour';
import roundDigit from '@utils/roundDigit';
import dayjs from '@utils/dayjsTime';
// styles
import './WaterCyclesPage.scss';
import { ToggleSwitch } from '@pages/WaterCyclesPage/styles';
import { primaryColor } from '../../assets/tss/common';
// interfaces
import { WaterCyclesPageProps, WaterCyclesPageState } from './interfaces';
// components
const CardInfo = lazy(() => import('@components/CardInfo'));
const GeneralCardInfo = lazy(() => import('@components/GeneralCardInfo'));
const Modal = lazy(() => import('@components/Modal'));
const Table = lazy(() => import('@components/Table'));
const DashboardCard = lazy(() => import('@components/DashboardCard'));
const DonutDisplay = lazy(() => import('@components/DonutDisplay'));
const AreaChardDisplay = lazy(() => import('@components/AreaChartDisplay'));

export const WaterCyclesTemplate = ({
	addNewSchedule,
	editSchedule,
	getAllSchedules,
	deleteSingleSchedule,
	togglePump,
	getPumpStatus,
	toggleScheduleStatus,
	getWaterData,
	status,
	schedules,
	match,
	isLoading,
	location,
	enabled,
	devices,
	waterData,
}: WaterCyclesPageProps): JSX.Element => {
	const [state, setState] = useState<WaterCyclesPageState>({
		isEditMode: false,
		isDeleteModalOpen: false,
		scheduleId: '',
		statusClass: '',
		isEnabled: false,
		isScheduleModalOpen: false,
		scheduleToEdit: '',
		isActionDone: false,
		isLoading: false,
		selectedTimeSchedule: new Date(),
		hasError: false,
		schedules: [
			{
				_id: '',
				schedule: '',
				enabled: false,
				createdAt: '',
				updatedAt: '',
				user: '',
			},
		],
	});

	const { setDeviceModalOpen } = useContext(ComponentContext);
	const user = useContext(UserContext);
	const modalRef = createRef();

	useEffect(() => {
		setState({ ...state, isLoading: true });
		const getSchedules = async () => getAllSchedules(user.activeDevice._id);
		getSchedules().then(() =>
			setState((prevState) => ({
				...prevState,
				schedules,
				isLoading: false,
			})),
		);
	}, [schedules, user.activeDevice._id]);

	useEffect(() => {
		getPumpStatus(user.activeDevice._id).then(() =>
			setState((prevState) => ({
				...prevState,
				isEnabled: enabled,
			})),
		);
	}, [user.activeDevice._id]);

	useEffect(() => {
		const { selectedTimeSchedule } = state;
		const timeSchedules = [...new Set(schedules.map((item) => item.schedule))];
		const validate = validateOneHourTime(timeSchedules, selectedTimeSchedule);
		if (validate) {
			setState((prevState) => ({ ...prevState, hasError: true }));
		}
		setState((prevState) => ({ ...prevState, hasError: false }));
	}, [state.selectedTimeSchedule]);

	// useEffect(() => {
	//   props.getWaterData();
	// }, []);

	// React.useEffect(() => {
	//   const { scheduleToEdit } = state;
	//   const schedules = [...new Set(props.schedules.map(item => item.schedule))];
	//   const validateEdit = validateOneHourTime(schedules, scheduleToEdit);
	//   if (validateEdit) {
	//     setState({ ...state, hasError: true });
	//   } else if (validateEdit === false || undefined) {
	//     setState({ ...state, hasError: false });
	//   }
	// },              [state.scheduleToEdit]);

	const heightOfTank = 11; // units in centimeters
	const waterLevel = heightOfTank
		? waterData.waterLevel || heightOfTank
		: heightOfTank;
	const heightOfWater = roundDigit(
		((heightOfTank - waterLevel) / heightOfTank) * 100,
		0,
	);

	const PumpSwitch = withStyles({
		switchBase: {
			color: '#FFFFFF',
			'&$checked': {
				color: primaryColor,
			},
			'&$checked + $track': {
				backgroundColor: primaryColor,
			},
		},
		thumb: {
			width: 20,
			height: 20,
			animation: '$blink 1s ease infinite',
		},
		checked: {},
		track: {
			borderRadius: 20,
		},
		'@keyframes blink': {
			'50%': {
				transform: 'scale (1)',
				backgroundColor: primaryColor,
			},
		},
	})(Switch);

	// eslint-disable-next-line no-console
	const handleClick = (message: string) => console.log('Pumping');
	// mqtt?.publish('almond/pump', message);

	const handleTogglePumpOnChange = async (event) => {
		const { checked } = event.target;
		await handleClick(checked ? '1' : '0');
		await togglePump({
			enabled: checked,
			device: user.activeDevice._id,
		});
	};

	const handleToggleStatusChange = async (event, schedule) => {
		const { checked } = event.target;
		await toggleScheduleStatus(schedule._id, {
			enabled: checked,
			device: user.activeDevice._id,
		});
	};

	const handleAddTimeSchedule = (value) => {
		setState((prevState) => ({
			...prevState,
			selectedTimeSchedule: value,
		}));
	};

	const handleEditTimeChange = (value) => {
		setState((prevState) => ({
			...prevState,
			scheduleToEdit: value,
		}));
	};

	const showScheduleModal = (mode) => (event) => {
		event.preventDefault();
		const { id } = event.target;
		const schedule = schedules.filter((obj) => obj._id === id);

		switch (mode) {
			case 'Add':
				setState((prevState) => ({
					...prevState,
					isScheduleModalOpen: !prevState.isScheduleModalOpen,
					isEditMode: false,
				}));
				break;
			case 'Edit':
				setState((prevState) => ({
					...prevState,
					scheduleId: id,
					scheduleToEdit: schedule[0].schedule,
					isScheduleModalOpen: !prevState.isScheduleModalOpen,
					isEditMode: true,
				}));
				break;
			default:
				setState((prevState) => ({
					...prevState,
				}));
		}
	};

	const closeScheduleModal = (mode) => () => {
		switch (mode) {
			case 'Add':
				setState((prevState) => ({
					...prevState,
					isScheduleModalOpen: !prevState.isScheduleModalOpen,
					hasError: false,
				}));
				break;
			case 'Edit':
				setState((prevState) => ({
					...prevState,
					isScheduleModalOpen: !prevState.isScheduleModalOpen,
					hasError: false,
					isEditMode: false,
				}));
				break;
			default:
				setState((prevState) => ({
					...prevState,
				}));
		}
	};

	const toggleScheduleDeleteModal = () => {
		setState((prevState) => ({
			...prevState,
			isDeleteModalOpen: !prevState.isDeleteModalOpen,
		}));
	};

	const handleScheduleDelete = (event) => {
		event.preventDefault();
		deleteSingleSchedule(state.scheduleId).then(toggleScheduleDeleteModal);
	};

	const onAddEditScheduleSubmit = (event) => {
		event.preventDefault();
		const {
			isEditMode,
			scheduleId,
			scheduleToEdit,
			selectedTimeSchedule,
		} = state;

		const schedule = {
			schedule: isEditMode ? scheduleToEdit : selectedTimeSchedule,
			device: user.activeDevice._id,
		};

		if (isEditMode) {
			editSchedule(scheduleId, schedule).then(closeScheduleModal('Edit'));
		}
		addNewSchedule(schedule).then(closeScheduleModal('Add'));
	};

	const BlankContent = (message) => (
		<div className="blank-content">
			<h2>{message}</h2>
		</div>
	);

	const AddEditScheduleModal = () => {
		const handleClose = (): void =>
			setState({
				...state,
				isScheduleModalOpen: false,
			});
		return (
			<Modal
				ref={modalRef}
				isModalOpen={state.isScheduleModalOpen}
				renderContent={() => RenderTimeScheduleForm()}
				onClose={handleClose}
				renderHeader={() =>
					state.isEditMode ? 'Edit time schedule' : 'Create a new time schedule'
				}
				submitButtonName={
					state.isEditMode ? 'Update schedule' : 'Create new schedule'
				}
				onSubmit={onAddEditScheduleSubmit}
				onDismiss={closeScheduleModal(state.isEditMode ? 'Edit' : 'Add')}
				disabled={state.hasError}
			/>
		);
	};

	const DeleteScheduleModal = () => (
		<Modal
			ref={modalRef}
			isModalOpen={state.isDeleteModalOpen}
			renderContent={() => (
				<h5 className="headline-5">
					Do you confirm deletion of time schedule?
				</h5>
			)}
			onClose={toggleScheduleDeleteModal}
			renderHeader={() => 'Delete Time Schedule'}
			submitButtonName="Delete schedule"
			onSubmit={handleScheduleDelete}
			onDismiss={toggleScheduleDeleteModal}
		/>
	);

	const ActionButtons = (schedule) => {
		const handleDelete = () =>
			setState({
				...state,
				scheduleId: schedule,
				isDeleteModalOpen: true,
			});
		return (
			<div key={schedule} className="action-buttons">
				<span
					id={schedule}
					onClick={showScheduleModal('Edit')}
					onKeyDown={showScheduleModal('Edit')}
					role="presentation"
				>
					<h5 id={schedule} className="action-buttons__edit">
						Edit
					</h5>
				</span>
				<span
					id={schedule}
					onClick={handleDelete}
					onKeyDown={handleDelete}
					role="presentation"
				>
					<h5 className="action-buttons__delete">Delete</h5>
				</span>
			</div>
		);
	};

	const TableContent = (timeSchedule) => {
		const tableHeaders = {
			Time: { valueKey: 'time', colWidth: '30' },
			Actions: { valueKey: 'actions', colWidth: '45' },
			Status: { valueKey: 'status' },
		};

		const tableValues = timeSchedule.map((schedule) => ({
			id: schedule,
			time: `${dayjs.utc(schedule[1].schedule).format('HH:mm')}`,
			actions: ActionButtons(schedule[1]._id),
			status: (
				<ToggleSwitch
					checked={schedule[1].enabled}
					onChange={(e) => handleToggleStatusChange(e, schedule[1])}
				/>
			),
		}));

		return (
			<Suspense fallback={<LinearProgressBar delay={500} />}>
				<Table
					keys={tableHeaders}
					values={tableValues}
					statusClass={enabled ? 'tbl-status' : ''}
				/>
			</Suspense>
		);
	};

	const RenderTimeScheduleForm = () => {
		const {
			isEditMode,
			selectedTimeSchedule,
			scheduleToEdit,
			hasError,
		} = state;

		return (
			<div className="form-cell">
				{isEditMode ? (
					<>
						<h5 className="h5-sub-line">
							Change the time schedule as per your preference for pumping.
						</h5>
						<h5>
							However, make sure the time difference is at least 1 hour apart
						</h5>
					</>
				) : (
					<>
						<h5 className="h5-sub-line">
							Add a new time schedule as per your preference for pumping.
						</h5>
						<h5>
							However, make sure the time difference is at least 1 hour apart
						</h5>
					</>
				)}
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<TimePicker
						className="mdc-text-field--fullwidth"
						name="time_schedule"
						inputVariant="outlined"
						label="time schedule"
						value={isEditMode ? scheduleToEdit : selectedTimeSchedule}
						onChange={isEditMode ? handleEditTimeChange : handleAddTimeSchedule}
						{...(hasError ? { error: true } : {})}
						{...(hasError
							? {
									helperText: 'Schedule time has to be at least one hour apart',
							  }
							: {})}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<IconButton href="#">
										<AddAlarmTwoTone style={{ color: primaryColor }} />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</MuiPickersUtilsProvider>
				<p
					className="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg
            mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg"
					aria-hidden="false"
				/>
			</div>
		);
	};

	const handleDeviceModalOpen = (): void => setDeviceModalOpen(true);
	return (
		<div className="water-cycles-page">
			<Row>
				<Cell columns={7} desktopColumns={7} tabletColumns={8} phoneColumns={4}>
					<div className="main-subheader">
						<div
							className="device-header-container"
							onClick={handleDeviceModalOpen}
							onKeyDown={handleDeviceModalOpen}
							role="presentation"
						>
							<h3 className="main-subheader__device-id">
								{`Device ID: ${user.activeDevice.id}`}
								<ArrowDropDown />
							</h3>
						</div>
					</div>
				</Cell>
			</Row>
			<Row>
				<Cell columns={6} desktopColumns={6} tabletColumns={8} phoneColumns={4}>
					<GeneralCardInfo
						mainHeader="Manual Override"
						subHeader="Pump water directly into the system"
						icon={<BlurCircular className="content-icon general-info-icon" />}
						actionItem={
							<PumpSwitch
								className="manual-override"
								onChange={handleTogglePumpOnChange}
								checked={enabled}
								inputProps={{ 'aria-label': 'primary checkbox' }}
							/>
						}
					/>
					<CardInfo
						mainHeader="Water Schedules"
						subHeader="Create a new water schedule for your pump cycle"
						icon={<ScheduleTwoTone className="content-icon" />}
						buttonName="Add schedule"
						onClick={showScheduleModal('Add')}
					/>
					<DashboardCard
						classes="recent-activities-available"
						heading="Water Schedules"
						body={
							schedules.length > 0
								? TableContent(Object.entries(schedules))
								: BlankContent(
										'Click the + to add a new pump time schedule or toggle the manual override to turn on and off the pump',
								  )
						}
					/>
					{AddEditScheduleModal()}
					{DeleteScheduleModal()}
				</Cell>
				<Cell columns={6} desktopColumns={6} tabletColumns={8} phoneColumns={4}>
					<DashboardCard
						classes="recent-activities-available "
						heading="Water Tank Level"
						body={
							<DonutDisplay
								backgroundColor={['#CCCCCC', '#36A2EB']}
								hoverBackgroundColor={['#CCCCCC', '#2d9fec']}
								data={[waterLevel, heightOfTank - waterLevel]}
								donutInfo={`${heightOfWater}%`}
								halfDonut={false}
							/>
						}
					/>
					<DashboardCard
						classes="recent-activities-available"
						heading="Water Temperature"
						body={
							<AreaChardDisplay
								backgroundColor="rgba(25, 103, 210, 0.2)"
								chartColor="#1967D2"
								chartData={[15, 16, 20, 27, 21, 24, 21, 19, 16]}
							/>
						}
						actionItem={
							<ActionButton
								name="Today"
								startIcon={<DateRange />}
								variant="text"
							/>
						}
					/>
				</Cell>
			</Row>
		</div>
	);
};

export default WaterCyclesTemplate;
