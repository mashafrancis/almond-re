import { useContext, useState } from 'react';

// components
import {
	AdminBottomNavigationMenus,
	BottomNavigationMenus,
} from '@components/MenuRoutes';

// third party
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// components
import { UserContext } from '@context/UserContext';
import { ComponentContext } from '@context/ComponentContext';
import isArrayNotNull from '@utils/checkArrayEmpty';

// styles
import './BottomNavigation.scss';

const useStyles = makeStyles({
	root: {
		width: 'auto',
		paddingLeft: '10px',
		paddingRight: '10px',
		height: '46px',
	},
});

const PageBottomNavigation = (): JSX.Element => {
	const menu = useContext(ComponentContext);
	const user = useContext(UserContext);
	const { setSelectedIndex } = menu;

	const checkIsAdmin = () =>
		user.isAdmin ? AdminBottomNavigationMenus : BottomNavigationMenus;

	const classes = useStyles();
	const selectedIndex = JSON.parse(
		window.localStorage.getItem('selectedIndex') as string,
	);
	const [value, setValue] = useState(
		isArrayNotNull(selectedIndex) ? 0 : selectedIndex.item,
	);
	// const handleClick = (index: number): void =>
	// 	setSelectedIndex({
	// 		group: 0,
	// 		item: index,
	// 	});
	const handleChange = (event, newValue) => {
		setValue(newValue);
		setSelectedIndex(newValue);
	};

	// :TODO Avoid wasteful re-rendering while using inline functions (use .bind on the function as below)
	return (
		<div data-testid="bottom-navigation">
			<BottomNavigation
				value={value}
				onChange={handleChange}
				className={`${classes.root} page-content__navigation`}
				showLabels
			>
				{checkIsAdmin().map((menuNav, index) => (
					<BottomNavigationAction
						key={menuNav.label}
						label={menuNav.label}
						icon={menuNav.icon}
						value={index}
					/>
				))}
			</BottomNavigation>
		</div>
	);
};

export default PageBottomNavigation;
