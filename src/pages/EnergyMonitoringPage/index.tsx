import { connect } from 'react-redux';
import GeneralCardInfo from '@components/GeneralCardInfo';
import MemoryTwoToneIcon from '@material-ui/icons/MemoryTwoTone';

// thunks
import { displaySnackMessage } from '@modules/snack';

// styles
import './EnergyMonitoringPage.scss';

// interfaces
import Grid from '@material-ui/core/Grid';
import { EnergyMonitoringPageProps } from './interfaces';

export const EnergyMonitoringPage = (
	props: EnergyMonitoringPageProps,
): JSX.Element => (
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
				mainHeader="Energy Monitoring"
				subHeader="Power readings from the system and daily usage"
				icon={<MemoryTwoToneIcon className="content-icon general-info-icon" />}
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

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EnergyMonitoringPage);
