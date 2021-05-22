import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { parse } from 'query-string';
import { Typography, ListItem, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	item: {
		display: 'flex',
		textTransform: 'none',
		width: '100%',
		color: theme.palette.text.primary,
		'&:hover': {
			background: 'transparent',
			color: theme.palette.primary.main,
		},
	},
	itemActive: {
		color: theme.palette.primary.main,
		'& span': {
			fontWeight: 700,
		},
	},
}));

const getComponentId = () =>
	parse(window.location.search).component || 'introduction';

interface Props {
	className?: string;
	href: string;
	title: string;
	id: string;
}

const NavItem = ({
	className,
	href,
	title,
	id,
	...rest
}: Props): JSX.Element => {
	const classes = useStyles();

	return (
		<NavLink to={href}>
			<ListItem
				className={clsx(
					classes.item,
					getComponentId() === id ? classes.itemActive : '',
					className,
				)}
				{...rest}
			>
				<Typography variant="body2" component="span">
					{title}
				</Typography>
			</ListItem>
		</NavLink>
	);
};

export default NavItem;
