import { ChangeEvent, createElement, useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';
import { SectionAlternate, CardBase } from '@components/organisms';
import { MenuComponentProps } from '@components/molecules/MenuRoutes/interfaces';
import {
	WidgetsRounded,
	SecurityOutlined,
	NotificationsNone,
	AllOut,
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { TabPanel, MenuTabs, MenuTab } from '@components/atoms';
import { Hero, General, Security, Notifications, Device } from './components';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		width: '100%',
	},
	section: {
		'& .section-alternate__content': {
			paddingTop: 0,
			marginTop: theme.spacing(-5),
			position: 'relative',
			zIndex: 1,
		},
		'& .card-base__content': {
			padding: theme.spacing(2),
			[theme.breakpoints.up('md')]: {
				padding: theme.spacing(3),
			},
		},
	},
	menu: {
		height: 'auto',
	},
	list: {
		display: 'inline-flex',
		overflow: 'auto',
		flexWrap: 'nowrap',
		width: '100%',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
			flexDirection: 'column',
			marginRight: theme.spacing(-3),
			marginLeft: theme.spacing(-3),
		},
	},
	listItem: {
		marginRight: theme.spacing(2),
		flex: 0,
		cursor: 'pointer',
		[theme.breakpoints.up('md')]: {
			paddingRight: theme.spacing(3),
			paddingLeft: theme.spacing(3),
			borderLeft: '2px solid transparent',
		},
	},
	listItemActive: {
		[theme.breakpoints.up('md')]: {
			borderLeft: `2px solid ${theme.palette.primary.dark}`,
		},
		'& .menu__item': {
			color: theme.palette.text.primary,
		},
	},
}));

const subPages: MenuComponentProps[] = [
	{
		id: 'general',
		primaryText: 'General',
		component: General,
		icon: <WidgetsRounded />,
	},
	{
		id: 'security',
		primaryText: 'Security',
		component: Security,
		icon: <SecurityOutlined />,
	},
	{
		id: 'device',
		primaryText: 'Device',
		component: Device,
		icon: <AllOut />,
	},
	{
		id: 'notifications',
		primaryText: 'Notifications',
		component: Notifications,
		icon: <NotificationsNone />,
	},
];

const AccountSettingsPage = (): JSX.Element => {
	const classes = useStyles();

	const [selectedTabIndex, setSelectedTabIndex] = useState<number>(
		JSON.parse(window.localStorage.getItem('selectedTabIndex') as string) || 0,
	);

	useEffect(() => {
		window.localStorage.setItem(
			'selectedTabIndex',
			JSON.stringify(selectedTabIndex),
		);
	}, [selectedTabIndex]);

	const history = useHistory();

	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
		defaultMatches: true,
	});

	const handleOnChange = (
		event: ChangeEvent<HTMLDivElement>,
		value: number,
	) => {
		setSelectedTabIndex(value);
	};

	const a11yProps = (index: number | string) => {
		return {
			id: `menu-tab-${index}`,
			'aria-controls': `menu-tabpanel-${index}`,
		};
	};

	return (
		<div className={classes.root}>
			<Hero />
			<SectionAlternate className={classes.section}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={2}>
						<CardBase noShadow align="left" className={classes.menu}>
							<MenuTabs
								value={selectedTabIndex}
								onChange={handleOnChange}
								orientation={isSm ? 'vertical' : 'horizontal'}
								scrollButtons={false}
								textColor="primary"
								aria-label="menu tabs"
							>
								{subPages.map((item) => (
									<MenuTab
										key={item.primaryText}
										label={item.primaryText}
										icon={item.icon}
										{...a11yProps(selectedTabIndex)}
									/>
								))}
							</MenuTabs>
						</CardBase>
					</Grid>
					<Grid item xs={12} md={10}>
						<CardBase noShadow align="left">
							<TabPanel value={selectedTabIndex} index={selectedTabIndex}>
								{createElement(subPages[selectedTabIndex].component, {
									history,
								})}
							</TabPanel>
						</CardBase>
					</Grid>
				</Grid>
			</SectionAlternate>
		</div>
	);
};

export default AccountSettingsPage;
