import {
	Box,
	Button,
	Drawer,
	List,
	Typography,
	ListItem,
	makeStyles,
	useMediaQuery,
	Divider,
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { plantPortfolio } from '@pages/PlantResourcesPage/data';
import NavItem from './components/NavItem';

const useStyles = makeStyles((theme) => ({
	mobileDrawer: {
		width: 256,
	},
	desktopDrawer: {
		width: 256,
		top: 64,
		height: 'calc(100% - 64px)',
	},
	title: {
		fontWeight: 700,
	},
	navGroup: {
		marginBottom: theme.spacing(2),
		'&:last-child': {
			marginBottom: 0,
		},
	},
	navGroupTitle: {
		// paddingBottom: 0,
		color: theme.palette.primary.main,
		fontWeight: theme.typography.fontWeightMedium,
		backgroundColor: theme.palette.background.level2,
		borderRadius: theme.shape.borderRadius,
	},
}));

interface Props {
	onMobileClose: () => void;
	openMobile: boolean;
}

const Navbar = ({ onMobileClose, openMobile = false }: Props): JSX.Element => {
	const classes = useStyles();
	const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

	const content = (
		<Box height="100%" display="flex" flexDirection="column">
			<Box p={2} paddingBottom={0}>
				<List>
					{plantPortfolio.map((item) => (
						<div key={item.id}>
							<ListItem className={classes.navGroupTitle}>
								<Typography
									variant="body1"
									color="primary"
									className={classes.title}
								>
									{item.title}
								</Typography>
							</ListItem>
							<Divider sx={{ marginTop: 1 }} />
							<List disablePadding className={classes.navGroup}>
								{item.pages.map((page) => (
									<NavItem
										href={page.href}
										key={page.id}
										title={page.title}
										id={page.id}
									/>
								))}
							</List>
						</div>
					))}
				</List>
			</Box>
			<Box flexGrow={1} />
			<Box p={2} paddingTop={0}>
				<Box display="flex" justifyContent="center" mt={2}>
					<NavLink to="/store" style={{ width: '100%' }}>
						<Button color="primary" variant="outlined" fullWidth>
							View demo
						</Button>
					</NavLink>
				</Box>
				<Box display="flex" justifyContent="center" mt={2}>
					<NavLink to="/store" style={{ width: '100%' }}>
						<Button variant="contained" color="primary" fullWidth>
							Buy now
						</Button>
					</NavLink>
				</Box>
			</Box>
		</Box>
	);

	return (
		<>
			{hidden ? (
				<Drawer
					anchor="left"
					classes={{ paper: classes.mobileDrawer }}
					onClose={() => onMobileClose()}
					open={openMobile}
					variant="temporary"
				>
					{content}
				</Drawer>
			) : (
				<Drawer
					anchor="left"
					classes={{ paper: classes.desktopDrawer }}
					open
					variant="persistent"
				>
					{content}
				</Drawer>
			)}
		</>
	);
};

export default Navbar;
