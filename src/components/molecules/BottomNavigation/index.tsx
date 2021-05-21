import { useContext } from 'react';
// components
import {
	AdminBottomNavigationMenus,
	BottomNavigationMenus,
} from '@components/molecules';
// third party
import {
	BottomNavigation,
	BottomNavigationAction,
	AppBar,
	Divider,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui//styles';
import { Theme } from '@material-ui/core/styles';
// components
import { UserContext } from '@context/UserContext';
import { ComponentContext } from '@context/ComponentContext';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			// paddingLeft: 10,
			// paddingRight: 10,
			// height: '46px',
		},
		label: {
			fontSize: 12,
			borderTop: '0 !important',
		},
		navigationAction: {
			maxWidth: 'unset',
			minWidth: 'unset',
		},
		selected: {
			fontSize: '12px !important',
			borderTop: '1px solid',
		},
		appBar: {
			top: 'auto',
			bottom: 0,
			backgroundColor: theme.palette.background.default,
			zIndex: theme.zIndex.drawer + 1,
		},
	}),
);

const PageBottomNavigation = (): JSX.Element => {
	const { selectedIndex, setSelectedIndex } = useContext(ComponentContext);
	const { isAdmin } = useContext(UserContext);

	const checkIsAdmin = () =>
		isAdmin ? AdminBottomNavigationMenus : BottomNavigationMenus;

	const classes = useStyles();
	const handleChange = (event, newValue) => setSelectedIndex(newValue);

	// :TODO Avoid wasteful re-rendering while using inline functions (use .bind on the function as below)
	return (
		<div data-testid="bottom-navigation">
			<AppBar position="fixed" className={classes.appBar} elevation={0}>
				<Divider />
				<BottomNavigation
					value={selectedIndex}
					onChange={handleChange}
					classes={{
						root: classes.root,
					}}
					showLabels
				>
					{checkIsAdmin().map((menuNav, index) => (
						<BottomNavigationAction
							className={classes.navigationAction}
							classes={{
								label: classes.label,
								selected: classes.selected,
							}}
							key={menuNav.label}
							label={menuNav.label}
							icon={menuNav.icon}
							value={index}
						/>
					))}
				</BottomNavigation>
			</AppBar>
		</div>
	);
};

export default PageBottomNavigation;
