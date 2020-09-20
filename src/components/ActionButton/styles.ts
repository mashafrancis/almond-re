import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { defaultFont, primaryColor, whiteColor } from '../../assets/tss/common';

export default makeStyles((theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: primaryColor,
			color: whiteColor,
			...defaultFont,
		},
	}),
);
