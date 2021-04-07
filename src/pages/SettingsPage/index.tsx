// react libraries
import { lazy } from 'react';

// third-party libraries
import { connect } from 'react-redux';
import { Settings } from '@material-ui/icons';

// thunk
import { displaySnackMessage } from '@modules/snack';

// interfaces
import { SettingsPageProps } from '@pages/SettingsPage/interfaces';
import Grid from '@material-ui/core/Grid';

// components
const GeneralCardInfo = lazy(() => import('@components/GeneralCardInfo'));

export const SettingsPage = (props: SettingsPageProps) => (
	<Grid container item xs={12} style={{ margin: 0, padding: 0 }}>
		<Grid
			item
			container
			direction="column"
			justify="flex-start"
			alignItems="stretch"
			spacing={1}
			xs
			style={{ margin: 0, padding: 0 }}
		>
			<GeneralCardInfo
				mainHeader="Settings"
				subHeader="Adjust your preferences for better experience"
				icon={<Settings className="content-icon general-info-icon" />}
			/>
		</Grid>
	</Grid>
);

export const mapStateToProps = (state) => ({
	error: state.error,
});

export const mapDispatchToProps = (dispatch) => ({
	displaySnackMessage: (message) => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
