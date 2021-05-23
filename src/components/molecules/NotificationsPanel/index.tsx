import { useState, KeyboardEvent, MouseEvent } from 'react';
import {
	Badge,
	colors,
	Divider,
	Grid,
	Stack,
	SwipeableDrawer,
	Typography,
} from '@material-ui/core';
import { ActivityLogCard } from '@components/atoms';
import { BlankContent } from '@pages/WaterCyclesPage';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { Notifications, NotificationsNone } from '@material-ui/icons';
import { GeneralCardInfo } from '@components/molecules';
import { notificationsUnread } from '../../../layouts/Dashboard/components/Topbar/fixtures';

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
	},
	blankState: {
		font: '300 36px/44px Google Sans,Helvetica Neue,sans-serif',
		letterSpacing: 'normal',
		marginBottom: 24,
		color: theme.palette.text.secondary,
	},
}));

const NotificationsPanel = (): JSX.Element => {
	const [isNotificationsDrawerOpen, setNotificationsDrawerState] =
		useState<boolean>(false);

	const classes = useStyles();

	const iOS =
		typeof window === 'undefined' &&
		/iPad|iPhone|iPod/.test(navigator.userAgent);

	const handleNotificationsDrawer =
		(open: boolean) => (event: KeyboardEvent | MouseEvent) => {
			if (
				event &&
				event.type === 'keydown' &&
				((event as KeyboardEvent).key === 'Tab' ||
					(event as KeyboardEvent).key === 'Shift')
			) {
				return;
			}
			setNotificationsDrawerState(() => open);
		};

	const renderNotificationsDrawer = () => (
		<SwipeableDrawer
			anchor="right"
			open={isNotificationsDrawerOpen}
			onClose={handleNotificationsDrawer(false)}
			onOpen={handleNotificationsDrawer(true)}
			disableBackdropTransition={!iOS}
			disableDiscovery={iOS}
			// sx={{
			// 	paddingLeft: 16,
			// 	paddingRight: 16,
			// 	marginLeft: 16,
			// 	marginRight: 16,
			// }}
		>
			<div style={{ margin: 10 }}>
				<Stack
					direction="column"
					justifyContent="space-around"
					alignItems="flex-start"
					spacing={1}
					sx={{
						backgroundColor: colors.blue[100],
						padding: 2,
						borderRadius: '8px',
					}}
				>
					<Stack
						direction="row"
						justifyContent="center"
						alignItems="center"
						spacing={1}
					>
						<Typography variant="h6" gutterBottom={false} color="primary">
							Recent notifications
						</Typography>
						<Notifications color="primary" />
					</Stack>
					<Typography
						variant="body1"
						gutterBottom
						// sx={{ marginTop: '20px', paddingLeft: '16px', paddingRight: '16px' }}
					>
						{`You have ${notificationsUnread.length} notifications unread`}
					</Typography>
				</Stack>
				<Divider sx={{ marginTop: 2 }} />
			</div>

			{/* <GeneralCardInfo */}
			{/*	mainHeader="Notifications" */}
			{/*	subHeader={`You have ${notificationsUnread.length} notifications unread`} */}
			{/* /> */}

			{notificationsUnread.length !== 0 ? (
				notificationsUnread.map((notification: any) => (
					<div
						key={notification._id}
						style={{ paddingLeft: 12, paddingRight: 12 }}
					>
						<ActivityLogCard
							log={notification.actionDesc}
							date={notification.createdAt}
							type="info"
						/>
					</div>
				))
			) : (
				<Stack
					direction="column"
					justifyContent="center"
					alignItems="center"
					spacing={3}
				>
					<p aria-hidden="true" className={classes.blankState}>
						¯\_(ツ)_/¯{' '}
					</p>
					<BlankContent message="No recent notifications!" />
				</Stack>
			)}
		</SwipeableDrawer>
	);

	const renderNotificationsIcon = (): JSX.Element => (
		// :TODO: Implement notifications function
		<Badge
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			color="primary"
			badgeContent={3}
		>
			<Notifications
				onClick={handleNotificationsDrawer(!isNotificationsDrawerOpen)}
				color="primary"
			/>
		</Badge>
	);

	return (
		<>
			{renderNotificationsIcon()}
			{renderNotificationsDrawer()}
		</>
	);
};

export default NotificationsPanel;
