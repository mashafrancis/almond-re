import React, {
	useState,
	createContext,
	SyntheticEvent,
	MouseEvent,
} from 'react';
import {
	ComponentContextProps,
	ComponentContextState,
} from '@context/ComponentContext/interfaces';
import isArrayNotNull from '@utils/checkArrayEmpty';

const selectedIndex = JSON.parse(
	window.localStorage.getItem('selectedIndex') as string,
);

const ComponentContext = createContext({
	isMenuOpen: false,
	selectedIndex: {
		group: isArrayNotNull(selectedIndex) ? selectedIndex.group : 0,
		item: isArrayNotNull(selectedIndex) ? selectedIndex.item : 0,
	},
	isSelectDeviceModalOpen: false,
	isActivityDrawerOpen: false,
	activityLogsViewed: false,
	setOpen: (_open: boolean) => {},
	setSelectedIndex: (_selectedIndex: { group: number; item: number }) => {},
	setDeviceModalOpen: (_open: boolean) => {},
	handleSelectDeviceModal: () => {},
	handleCloseDeviceModal: () => {},
	toggleActivityDrawer: (
		_isActivityDrawerOpen: boolean,
		_activityLogsViewed: boolean,
	) => {},
	setSnackMessage: (_message: string) => {},
	setOpenSnack: (_open: boolean) => {},
	handleCloseSnack: (e: any) => {},
	snackMessage: '',
	isSnackOpen: false,
});

const ComponentProvider = ({
	children,
	...props
}: ComponentContextProps): any => {
	const [state, setState] = useState<ComponentContextState>({
		isOpen: false,
		isMenuOpen: false,
		selectedIndex: {
			group: 0,
			item: 0,
		},
		isSelectDeviceModalOpen: false,
		isActivityDrawerOpen: false,
		activityLogsViewed: false,
		isSnackOpen: false,
		snackMessage: '',
	});

	const setOpen = (isOpen: boolean) =>
		setState((prevState) => ({ ...prevState, isMenuOpen: isOpen }));

	const setOpenSnack = (isOpen: boolean) =>
		setState((prevState) => ({ ...prevState, isSnackOpen: isOpen }));

	const setSnackMessage = (message: string) =>
		setState((prevState) => ({ ...prevState, snackMessage: message }));

	const setSelectedIndex = (selectedIndex: { group: number; item: number }) => {
		setState((prevState) => ({ ...prevState, selectedIndex }));
		window.localStorage.setItem('selectedIndex', JSON.stringify(selectedIndex));
	};

	const setDeviceModalOpen = (isModalOpen: boolean) => {
		setState((prevState) => ({
			...prevState,
			isSelectDeviceModalOpen: isModalOpen,
		}));
	};

	const toggleActivityDrawer = (
		isActivityDrawerOpen: boolean,
		activityLogsViewed: boolean,
	) => {
		setState((prevState) => ({
			...prevState,
			isActivityDrawerOpen,
			activityLogsViewed,
		}));
	};

	const handleSelectDeviceModal = () => {
		setState((prevState) => ({
			...prevState,
			isSelectDeviceModalOpen: !prevState.isSelectDeviceModalOpen,
		}));
	};

	const handleCloseDeviceModal = () => {
		setState((prevState) => ({
			...prevState,
			isSelectDeviceModalOpen: !prevState.isSelectDeviceModalOpen,
		}));
	};

	const handleCloseSnack = (
		event: SyntheticEvent | MouseEvent,
		reason?: string,
	) => {
		if (reason === 'clickaway') {
			return;
		}
		setState((prevState) => ({ ...prevState, isSnackOpen: false }));
	};

	const {
		selectedIndex,
		isMenuOpen,
		isSelectDeviceModalOpen,
		isActivityDrawerOpen,
		activityLogsViewed,
		isSnackOpen,
		snackMessage,
	} = state;

	return (
		<ComponentContext.Provider
			value={{
				isMenuOpen,
				selectedIndex,
				isSelectDeviceModalOpen,
				isActivityDrawerOpen,
				activityLogsViewed,
				setSelectedIndex,
				setOpen,
				setDeviceModalOpen,
				handleSelectDeviceModal,
				handleCloseDeviceModal,
				toggleActivityDrawer,
				setSnackMessage,
				handleCloseSnack,
				setOpenSnack,
				isSnackOpen,
				snackMessage,
				...props,
			}}
		>
			{children}
		</ComponentContext.Provider>
	);
};

export { ComponentContext, ComponentProvider };
