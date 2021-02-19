import { useState, ReactNode, lazy } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	useMediaQuery,
	Divider,
	Hidden,
	Drawer,
	Toolbar,
	Container,
} from '@material-ui/core';
import isArrayNotNull from '@utils/checkArrayEmpty';
import MenuContent from '@components/MenuContent';
import PageBottomNavigation from '@components/BottomNavigation';
import { Topbar } from './components';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
		// flexGrow: 1,
	},
	content: {
		flexGrow: 2,
		// padding: theme.spacing(3),
	},
	container: {
		paddingLeft: 60,
		paddingRight: 60,
		[theme.breakpoints.down('md')]: {
			padding: 0,
			marginBottom: 30,
		},
	},
	drawer: {
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerPaper: {
		// backgroundColor: 'rgba(66, 133, 244, 0.05)',
		position: 'relative',
		border: 'none',
	},
}));

interface Props {
	children: ReactNode;
	themeToggler: Function;
	themeMode: string;
}

const activityLogs = [];

const Dashboard = ({
	children,
	themeToggler,
	themeMode,
}: Props): JSX.Element => {
	const classes = useStyles();

	return (
		<div
			className={clsx({
				[classes.root]: true,
			})}
		>
			<Topbar
				themeMode={themeMode}
				themeToggler={themeToggler}
				isActivityLogsEmpty={!isArrayNotNull(activityLogs)}
			/>
			<Hidden smDown>
				<Drawer
					variant="permanent"
					className={classes.drawer}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<Toolbar />
					<MenuContent />
				</Drawer>
			</Hidden>
			<main className={classes.content}>
				<Container maxWidth="xl" className={classes.container}>
					<Toolbar />
					{children}
				</Container>
			</main>
			<Hidden mdUp>
				<PageBottomNavigation />
			</Hidden>
		</div>
	);
};

export default Dashboard;
