import React from 'react';
import clsx from 'clsx';
import {NavLink} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import { Image } from '@components/atoms';
import logo from "../../../../assets/images/logo.png";

const useStyles = makeStyles((theme) => ({
	toolbar: {
		maxWidth: theme.layout.contentWidth,
		width: '100%',
		margin: '0 auto',
		padding: theme.spacing(0, 2),
		[theme.breakpoints.up('sm')]: {
			padding: theme.spacing(0, 8),
		},
	},
  logoContainer: {
    width: '10%',
    height: '10%',
    [theme.breakpoints.up('md')]: {
      width: '4%',
      height: '4%',
    },
  },
	logoImage: {
		width: '100%',
		height: '100%',
	},
}));

interface Props {
	themeMode: string;
	className?: string;
}

const Topbar = ({ themeMode, className, ...rest }: Props): JSX.Element => {
	const classes = useStyles();

	return (
		<Toolbar className={clsx(classes.toolbar, className)} {...rest}>
			<div className={classes.logoContainer}>
        <NavLink to="/home">
          <Image
            className={classes.logoImage}
            src={
              themeMode === 'light'
                ? logo
                : logo
            }
            alt="almond"
            lazy={false}
          />
        </NavLink>
			</div>
		</Toolbar>
	);
};

export default Topbar;
