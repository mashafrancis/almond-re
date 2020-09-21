import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { defaultFont, primaryColor, whiteColor } from '../../assets/tss/common';

export default makeStyles((theme: Theme) =>
	createStyles({
		root: {
			...defaultFont,
		},
		contained: {
			backgroundColor: primaryColor,
			color: whiteColor,
		},
		text: {
			backgroundColor: `${whiteColor} !important`,
			color: `${primaryColor} !important`,
		},
		outlined: {
			backgroundColor: primaryColor,
			color: whiteColor,
		},
	}),
);
