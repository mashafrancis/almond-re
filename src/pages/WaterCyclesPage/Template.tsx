import React, {
	useState,
	useEffect,
	useContext,
	createRef,
	lazy,
	Suspense,
	ChangeEvent,
	useMemo,
} from 'react';
// third-party libraries
import DateFnsUtils from '@date-io/date-fns';
import {
	Button,
	Fab,
	IconButton,
	InputAdornment,
	LinearProgress,
	Switch,
	useMediaQuery,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import withStyles from '@material-ui/core/styles/withStyles';
import {
	createStyles,
	makeStyles,
	Theme,
	useTheme,
} from '@material-ui/core/styles';
import { LineChartCard } from '@components/organisms';
import {
	DataGrid,
	ColDef,
	ValueGetterParams,
	CellParams,
	GridToolbar,
	SortDirection,
	GridOverlay,
} from '@material-ui/data-grid';
// components
import Modal from '@components/Modal';
import GeneralCardInfo from '@components/GeneralCardInfo';
import DashboardCard from '@components/DashboardCard';
import DonutDisplay from '@components/DonutDisplay';
// icons
import {
	BlurCircular,
	ScheduleTwoTone,
	AddAlarmTwoTone,
	ArrowDropDown,
	Add,
} from '@material-ui/icons';
import { ComponentContext } from '@context/ComponentContext';
import { UserContext } from '@context/UserContext';
import LinearProgressBar from '@components/LinearProgressBar';
// utils
import {
	validateNewOneHourTime,
	validateEditOneHourTime,
} from '@utils/validateTimeOneHour';
import roundDigit from '@utils/roundDigit';
import dayjs from '@utils/dayjsTime';
// import { dateSelectOptions } from '@pages/WaterCyclesPage/fixtures';
import { ToggleSwitch, useTableStyles } from '@pages/WaterCyclesPage/styles';
import { DateRanges } from '@components/DateRangePicker/interfaces';
import getDateRange from '@utils/DateRangeSelect';
// interfaces
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useViewport from '@hooks/useViewport';

import { Schedule } from '@modules/timeSchedules/interfaces';
import { red } from '@material-ui/core/colors';
import { NoDataOverlay } from '@components/atoms';
import { WaterCyclesPageProps, WaterCyclesPageState } from './interfaces';
import { primaryColor } from '../../assets/tss/common';
import { IRootState } from '../../store/rootReducer';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		blankContent: {
			marginTop: 40,
			marginBottom: 40,
			fontFamily: 'San Francisco, serif !important',
			fontSize: 30,
			fontWeight: 300,
			letterSpacing: -2,
			wordSpacing: 2,
		},
		'& .super-app-theme--header': {
			color: theme.palette.text.primary,
			// fontWeight: 500,
		},
	}),
);

export const BlankContent = ({ message }) => {
	const classes = useStyles();
	return (
		<Typography
			variant="h6"
			color="textSecondary"
			className={classes.blankContent}
		>
			{message}
		</Typography>
	);
};

export const CustomLoadingOverlay = () => {
	return (
		<GridOverlay>
			<div style={{ position: 'absolute', top: 0, width: '100%' }}>
				<LinearProgressBar />
			</div>
		</GridOverlay>
	);
};

export const WaterCyclesTemplate = ({
	isLoading,
	addNewSchedule,
	editSchedule,
	getAllSchedules,
	deleteSingleSchedule,
	togglePump,
	getPumpStatus,
	toggleScheduleStatus,
	getAirTemperatureTrend,
	schedules,
	enabled,
	sensorData,
	waterTemperatureTrend,
}: WaterCyclesPageProps): JSX.Element => {
	// const dispatch = useDispatch();
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
		isDateRangeHidden: true,
		currentDateInView: '',
		waterCardDateRange: 'This Week',
		selectedTimeSchedule: dayjs(),
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

	const classes = useStyles();
	const tableClasses = useTableStyles();
	const { setDeviceModalOpen } = useContext(ComponentContext);
	const { activeDevice } = useContext(UserContext);

	// const sensorData = useSelector(selectTemperatureData)
	// const timeSchedules = useSelector(state => state)
	// const schedules = [{
	//   _id: '',
	//   id: '',
	//   schedule: '',
	//   enabled: false,
	//   createdAt: '',
	//   updatedAt: '',
	//   user: '',
	// }]
	// const enabled = true
	// const waterTemperatureTrend = []
	// const data = useMemo(sensorDataSelector, [])
	// const dataSensor = useSelector((state: IRootState) => data(state))
	// console.log('Class: , Function: WaterCyclesPage, Line 152 sensorDate():', dataSensor);

	useEffect(() => {
		setState({ ...state, isLoading: true });
		const getSchedules = async () => getAllSchedules(activeDevice?._id);
		getSchedules().then(() =>
			setState((prevState) => ({
				...prevState,
				schedules,
				isLoading: false,
			})),
		);
	}, [schedules, activeDevice?._id]);

	useEffect(() => {
		getPumpStatus(activeDevice?._id).then(() =>
			setState((prevState) => ({
				...prevState,
				isEnabled: enabled,
			})),
		);
	}, [activeDevice?._id]);

	useEffect(() => {
		// const queryParams = {
		// 	db: 'almond_db',
		// 	q:
		// 		'SELECT mean("temperature") FROM "data" WHERE time >= now() - 7d GROUP BY time(10s) fill(null)',
		// 	epoch: 'ms',
		// };
		const queryParams = {
			q: 'time >= now() - 7d',
		};
		getAirTemperatureTrend(queryParams).then(() => {
			setState((prevState) => ({
				...prevState,
				isLoading: false,
			}));
		});
	}, []);

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

	const { waterLevel } = sensorData;
	const heightOfTank = 600; // units in centimeters
	const waterLevelData = heightOfTank
		? waterLevel || heightOfTank
		: heightOfTank;
	const heightOfWater = roundDigit(
		((heightOfTank - waterLevelData) / heightOfTank) * 100,
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
			device: activeDevice?._id,
		});
	};

	const handleToggleStatusChange = async (event, schedule) => {
		const { checked } = event.target;
		await toggleScheduleStatus(schedule, {
			enabled: checked,
			device: activeDevice._id,
		});
	};

	const handleAddTimeSchedule = (value) => {
		setState((prevState) => ({
			...prevState,
			selectedTimeSchedule: value,
		}));
		validateNewTime(value);
	};

	const validateNewTime = (value) => {
		const timeSchedules = schedules.map((item) => item?.schedule);
		const validate = validateNewOneHourTime(timeSchedules, value);
		if (!validate) {
			setState((prevState) => ({ ...prevState, hasError: true }));
		} else {
			setState((prevState) => ({ ...prevState, hasError: false }));
		}
	};

	const validateScheduleOnOpen = (mode) => {
		const { selectedTimeSchedule, scheduleToEdit } = state;
		switch (mode) {
			case 'Add': {
				validateNewTime(selectedTimeSchedule);
			}
		}
	};

	const handleEditTimeChange = (value) => {
		setState((prevState) => ({
			...prevState,
			scheduleToEdit: value,
		}));
		validateEditTime(value);
	};

	const validateEditTime = (value) => {
		const { scheduleId } = state;
		const validate = validateEditOneHourTime(schedules, scheduleId, value);
		if (!validate) {
			setState((prevState) => ({ ...prevState, hasError: true }));
		} else {
			setState((prevState) => ({ ...prevState, hasError: false }));
		}
	};

	const showScheduleModal = (mode) => (event) => {
		event.preventDefault();
		const { id } = event.target;
		const schedule = schedules.filter((obj) => obj._id === id);
		const setEditTimeValue = (time) => {
			const [hour, minute] = time.split(':');
			return dayjs().hour(hour).minute(minute).format();
		};
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
					scheduleToEdit: setEditTimeValue(schedule[0].schedule),
					isScheduleModalOpen: !prevState.isScheduleModalOpen,
					isEditMode: true,
				}));
				break;
			default:
				setState((prevState) => ({
					...prevState,
				}));
		}
		validateScheduleOnOpen(mode);
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
		const timeValueString = (value) => dayjs(value).format('HH:mm');

		const schedule = {
			schedule: isEditMode
				? timeValueString(scheduleToEdit)
				: timeValueString(selectedTimeSchedule),
			device: activeDevice._id,
		};

		if (isEditMode) {
			editSchedule(scheduleId, schedule).then(closeScheduleModal('Edit'));
		} else {
			addNewSchedule(schedule).then(closeScheduleModal('Add'));
		}
	};

	const handleDateRangeModal = () => {
		setState((prevState) => ({
			...prevState,
			isDateRangeHidden: !prevState.isDateRangeHidden,
		}));
	};

	const onDateRangeChange = (range: DateRanges) => {
		handleDateRangeModal();
		console.log(
			'Class: , Function: onDateRangeChange, Line 324 range():',
			range,
		);
	};

	const currentDateView = (frequency: string) => {
		setState((prevState) => ({
			...prevState,
			currentDateInView: frequency,
		}));
	};

	const handleDateSelect = (event: ChangeEvent<{ value: unknown }>) => {
		const { value: param } = event.target;
		if (param === 'Pick a date') {
			setState((prevState) => ({
				...prevState,
				isDateRangeHidden: false,
			}));
		}

		setState((prevState) => ({
			...prevState,
			waterCardDateRange: param as string,
		}));

		const range = {
			startDate: new Date(),
			endDate: new Date(),
		};
		const date = getDateRange(param, range, currentDateView);
		const queryParams = {
			q: `time >= '${date.startDate}' and time <= '${date.endDate}'`,
		};
		getAirTemperatureTrend(queryParams).then(() => {
			setState((prevState) => ({
				...prevState,
				isLoading: false,
			}));
		});
	};

	const TimeScheduleForm = (): JSX.Element => {
		const {
			isEditMode,
			selectedTimeSchedule,
			scheduleToEdit,
			hasError,
		} = state;

		return (
			<>
				{isEditMode
					? 'Change the time schedule as per your preference for pumping.'
					: 'Add a new time schedule as per your preference for pumping.'}
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<TimePicker
						style={{ marginTop: 12 }}
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
										<AddAlarmTwoTone color="primary" />
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
			</>
		);
	};

	const AddEditScheduleModal = (): JSX.Element => {
		const handleClose = (): void =>
			setState({
				...state,
				isScheduleModalOpen: false,
			});
		return (
			<Modal
				isModalOpen={state.isScheduleModalOpen}
				renderContent={<TimeScheduleForm />}
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

	const DeleteScheduleModal = (): JSX.Element => (
		<Modal
			isModalOpen={state.isDeleteModalOpen}
			renderContent="Do you confirm deletion of time schedule?"
			onClose={toggleScheduleDeleteModal}
			renderHeader={() => 'Delete Time Schedule'}
			submitButtonName="Delete schedule"
			onSubmit={handleScheduleDelete}
			onDismiss={toggleScheduleDeleteModal}
		/>
	);

	const ActionButtons = (schedule: string): JSX.Element => {
		const handleDelete = () =>
			setState({
				...state,
				scheduleId: schedule,
				isDeleteModalOpen: true,
			});
		return (
			<div className={classes.root} key={schedule}>
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
							id={schedule}
							variant="body2"
							color="primary"
							onClick={showScheduleModal('Edit')}
							onKeyDown={showScheduleModal('Edit')}
						>
							Edit
						</Typography>
						<Typography
							style={{ cursor: 'pointer', color: red[900] }}
							id={schedule}
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

	const TableContent = (timeSchedules: Schedule[]): JSX.Element => {
		const columns: ColDef[] = [
			{
				field: 'time',
				headerName: 'Time',
				flex: 0.3,
				headerClassName: 'table-header',
				cellClassName: 'table-cell',
			},
			{
				field: 'actions',
				headerName: 'Actions',
				flex: 0.4,
				headerClassName: 'table-header',
				renderCell: (params: CellParams) =>
					ActionButtons(params.value as string),
			},
			{
				field: 'status',
				headerName: 'Status',
				flex: 0.3,
				headerClassName: 'table-header',
				renderCell: (params: CellParams) => (
					<ToggleSwitch
						checked={params.value as boolean}
						onChange={(e) =>
							handleToggleStatusChange(e, params.getValue('actions'))
						}
					/>
				),
			},
		];

		const rows = timeSchedules.map((schedule) => ({
			id: schedule._id,
			time: schedule.schedule,
			actions: schedule._id,
			status: schedule.enabled,
		}));

		return (
			<div className={tableClasses.root} style={{ height: 400, width: '100%' }}>
				<div style={{ display: 'flex', height: '100%' }}>
					<div style={{ flexGrow: 1 }}>
						<DataGrid
							className={tableClasses.root}
							loading={isLoading}
							rows={rows}
							pageSize={5}
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
									field: 'time',
									sort: 'asc' as SortDirection,
								},
							]}
						/>
					</div>
				</div>
			</div>
		);
	};

	const handleDeviceModalOpen = (): void => setDeviceModalOpen(true);

	return (
		<div className={classes.root} data-testid="water-cycles-page">
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
					<GeneralCardInfo
						mainHeader="Manual Override"
						subHeader="Pump water directly into the system"
						icon={<BlurCircular fontSize="large" />}
						actionItem={
							<PumpSwitch
								className="manual-override"
								onChange={handleTogglePumpOnChange}
								checked={enabled}
								inputProps={{ 'aria-label': 'primary checkbox' }}
							/>
						}
					/>
					<DashboardCard
						heading="Water Schedules"
						body={TableContent(schedules)}
						actionItem={
							<Button
								color="primary"
								size="small"
								variant="outlined"
								onClick={showScheduleModal('Add')}
							>
								<Add fontSize="small" />
								Add schedule
							</Button>
						}
					/>
					<AddEditScheduleModal />
					<DeleteScheduleModal />
				</Grid>
				<Grid
					item
					container
					justify="flex-start"
					alignItems="stretch"
					spacing={2}
					xs
					style={{ margin: 0, padding: 0 }}
				>
					<LineChartCard
						heading="Water Temperature"
						selectedValue={state.waterCardDateRange}
						handleDateSelect={handleDateSelect}
						isDateRangeHidden={state.isDateRangeHidden}
						onDateRangeChange={onDateRangeChange}
						handleDateRangeModal={handleDateRangeModal}
						data={waterTemperatureTrend}
					/>
				</Grid>
				<Grid
					item
					container
					justify="flex-start"
					alignItems="stretch"
					spacing={2}
					xs
					style={{ margin: 0, padding: 0 }}
				>
					<DashboardCard
						heading="Water Tank Level"
						body={
							<DonutDisplay
								backgroundColor={['#CCCCCC', '#36A2EB']}
								hoverBackgroundColor={['#CCCCCC', '#2d9fec']}
								data={[waterLevelData, heightOfTank - waterLevelData]}
								donutInfo={`${heightOfWater}%`}
								halfDonut={false}
							/>
						}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default WaterCyclesTemplate;
