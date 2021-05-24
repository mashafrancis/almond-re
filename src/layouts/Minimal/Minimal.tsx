import { ReactNode } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Container, Theme } from '@material-ui/core';
import { Topbar } from './components';

const useStyles = makeStyles((theme: Theme) => ({
	root: {},
	content: {
		height: '100%',
	},
	container: {
		padding: 0,
		[theme.breakpoints.down('md')]: {
			marginTop: 12,
		},
	},
}));

interface Props {
	children: ReactNode;
	themeMode: string;
	className?: string;
}

const Minimal = ({ themeMode, children, className }: Props): JSX.Element => {
	const classes = useStyles();

	return (
		<div className={clsx(classes.root, className)}>
			<Topbar themeMode={themeMode} />
			<Divider />
			<main className={classes.content}>
				<Container maxWidth="xl" className={classes.container}>
					{children}
				</Container>
			</main>
		</div>
	);
};

export default Minimal;
