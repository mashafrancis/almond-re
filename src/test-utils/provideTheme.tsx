import { ReactElement } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import getTheme from '../theme';

const provideTheme = (ui: () => JSX.Element): ReactElement => {
	return <MuiThemeProvider theme={getTheme('light')}>{ui}</MuiThemeProvider>;
};

export default provideTheme;
