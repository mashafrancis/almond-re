import { ReactElement } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import getTheme from '../theme';

const provideTheme = (ui: () => JSX.Element): ReactElement => {
	return <ThemeProvider theme={getTheme('light')}>{ui}</ThemeProvider>;
};

export default provideTheme;
