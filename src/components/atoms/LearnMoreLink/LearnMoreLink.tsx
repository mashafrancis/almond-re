import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { LearnMoreLinkProps } from '@components/atoms/LearnMoreLink/interfaces';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'inline-flex',
		alignItems: 'center',
		textDecoration: 'none',
		cursor: 'pointer',
	},
	title: {
		fontWeight: 'bold',
	},
	icon: {
		padding: 0,
		marginLeft: theme.spacing(1),
		'&:hover': {
			background: 'transparent',
		},
	},
}));

/**
 * Component to display the "Learn More" link
 *
 * @param {Object} props
 */
const LearnMoreLink = ({
	color,
	variant = 'subtitle1',
	title,
	href = '/',
	className,
	iconProps = {},
	typographyProps = {},
	...rest
}: LearnMoreLinkProps): JSX.Element => {
	const classes = useStyles();

	const children = (
		<>
			<Typography
				component="span"
				className={clsx('learn-more-link__typography', classes.title)}
				variant={variant}
				color={color || 'primary'}
				{...typographyProps}
			>
				<NavLink
					style={{ textDecoration: 'none', color: 'inherit' }}
					to={href}
				>
					{title}
				</NavLink>
			</Typography>
			<NavLink to={href}>
				<IconButton
					className={clsx('learn-more-link__icon-button', classes.icon)}
					color="primary"
					{...iconProps}
				>
					<ArrowRightAltIcon className="learn-more-link__arrow" />
				</IconButton>
			</NavLink>
		</>
	);

	return (
		<div
			className={clsx('learn-more-link', classes.root, className)}
			role="presentation"
			{...rest}
		>
			{children}
		</div>
	);
};

export default LearnMoreLink;
