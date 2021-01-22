import React from 'react';
import clsx from 'clsx';
import { useSpring, animated } from 'react-spring';
import { makeStyles, colors } from '@material-ui/core';
import { DarkModeTogglerProps } from '@components/atoms/DarkModeToggler/interfaces';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'relative',
	},
	border: {
		width: theme.spacing(5),
		height: theme.spacing(2),
		borderRadius: theme.spacing(3),
		border: '3px solid',
		borderColor: theme.palette.divider,
		backgroundColor: 'transparent',
		[theme.breakpoints.up('md')]: {
			width: theme.spacing(6),
			height: theme.spacing(3),
		},
	},
	borderDark: {
		borderColor: colors.indigo[700],
	},
	modeToggler: {
		position: 'absolute',
		top: `-${theme.spacing(1 / 2)}px`,
		left: `-${theme.spacing(1 / 2)}px`,
		width: theme.spacing(3),
		height: theme.spacing(3),
		borderRadius: '50%',
		backgroundColor: theme.palette.text.primary,
		transition: `transform .3s cubic-bezier(.4,.03,0,1)`,
		cursor: 'pointer',
		[theme.breakpoints.up('md')]: {
			width: theme.spacing(4),
			height: theme.spacing(4),
		},
	},
	modeTogglerDark: {
		transform: `translateX(${theme.spacing(3)}px)`,
		backgroundColor: colors.indigo[900],
	},
	modeTogglerIcon: {
		fill: theme.palette.secondary.main,
		marginTop: theme.spacing(1 / 2),
		marginLeft: theme.spacing(1 / 2),
		[theme.breakpoints.up('md')]: {
			marginTop: theme.spacing(1),
			marginLeft: theme.spacing(1),
		},
	},
}));

export const defaultProperties = {
	dark: {
		circle: {
			r: 9,
		},
		mask: {
			cx: '50%',
			cy: '23%',
		},
		svg: {
			transform: 'rotate(40deg)',
		},
		lines: {
			opacity: 0,
		},
	},
	light: {
		circle: {
			r: 5,
		},
		mask: {
			cx: '100%',
			cy: 0,
		},
		svg: {
			transform: 'rotate(90deg)',
		},
		lines: {
			opacity: 1,
		},
	},
	springConfig: { mass: 4, tension: 250, friction: 35 },
};

type SVGProps = Omit<React.HTMLAttributes<HTMLOrSVGElement>, 'onChange'>;
interface Props extends SVGProps {
	onChange: Function;
	themeMode: string;
	style?: React.CSSProperties;
	size?: number;
	animationProperties?: typeof defaultProperties;
	moonColor?: string;
	sunColor?: string;
}

/**
 * Component to display the dark mode toggler
 *
 * @param {Object} props
 */
const DarkModeToggler = ({
	onChange,
	children,
	themeMode = 'light',
	size = 24,
	animationProperties = defaultProperties,
	moonColor = 'white',
	sunColor = 'black',
	style,
	className,
	...rest
}: DarkModeTogglerProps): JSX.Element => {
	const properties = React.useMemo(() => {
		if (animationProperties !== defaultProperties) {
			return Object.assign(defaultProperties, animationProperties);
		}

		return animationProperties;
	}, [animationProperties]);

	const { circle, svg, lines, mask } = properties[
		themeMode === 'dark' ? 'dark' : 'light'
	];

	const svgContainerProps = useSpring({
		...svg,
		config: animationProperties.springConfig,
	});
	const centerCircleProps = useSpring({
		...circle,
		config: animationProperties.springConfig,
	});
	const maskedCircleProps = useSpring({
		...mask,
		config: animationProperties.springConfig,
	});
	const linesProps = useSpring({
		...lines,
		config: animationProperties.springConfig,
	});

	const toggle = () => {
		onChange(themeMode === 'light');
	};

	return (
		<animated.svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			color={themeMode === 'dark' ? moonColor : sunColor}
			fill="none"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			stroke="currentColor"
			onClick={toggle}
			style={{
				// @ts-ignore
				cursor: 'pointer',
				...svgContainerProps,
				...style,
			}}
			{...rest}
		>
			<mask id="myMask2">
				<rect x="0" y="0" width="100%" height="100%" fill="white" />
				<animated.circle
					// @ts-ignore
					style={maskedCircleProps}
					r="9"
					fill="black"
				/>
			</mask>

			<animated.circle
				cx="12"
				cy="12"
				fill={themeMode === 'dark' ? moonColor : sunColor}
				// @ts-ignore
				style={centerCircleProps}
				mask="url(#myMask2)"
			/>
			<animated.g
				stroke="currentColor"
				// @ts-ignore
				style={linesProps}
			>
				<line x1="12" y1="1" x2="12" y2="3" />
				<line x1="12" y1="21" x2="12" y2="23" />
				<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
				<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
				<line x1="1" y1="12" x2="3" y2="12" />
				<line x1="21" y1="12" x2="23" y2="12" />
				<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
				<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
			</animated.g>
		</animated.svg>
	);
};

export default DarkModeToggler;
