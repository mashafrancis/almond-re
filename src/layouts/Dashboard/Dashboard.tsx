import { ReactNode } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Drawer, Toolbar, Container, useMediaQuery } from '@material-ui/core';
import isArrayNotNull from '@utils/checkArrayEmpty';
import { MenuContent } from '@components/atoms';
import { BottomNavigation } from '@components/molecules';
import { Topbar } from './components';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		height: '100vh',
		background: theme.palette.alternate.main,
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	content: {
		flexGrow: 2,
	},
	container: {
		paddingLeft: 0,
		paddingRight: 0,
		[theme.breakpoints.down('md')]: {
			paddingLeft: 0,
			paddingRight: 0,
			marginTop: 8,
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
	themeToggler: () => void;
	themeMode: string;
}

const activityLogs = [];

const Dashboard = ({
	children,
	themeToggler,
	themeMode,
}: Props): JSX.Element => {
	const classes = useStyles();
	const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

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
			{hidden && (
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
			)}
			<main className={classes.content}>
				<Container maxWidth="xl" className={classes.container}>
					<Toolbar />
					{children}
				</Container>
			</main>
			{hidden ? null : <BottomNavigation />}
		</div>
	);
};

export default Dashboard;
