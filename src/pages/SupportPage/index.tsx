// react libraries
import { lazy } from 'react';

// third-party libraries
import { connect } from 'react-redux';
import SpaIcon from '@material-ui/icons/Spa';

// interfaces
import { SupportPageProps } from '@pages/SupportPage/interfaces';

// thunk
import { displaySnackMessage } from '@modules/snack';
import Grid from '@material-ui/core/Grid';

// components
const GeneralCardInfo = lazy(() => import('@components/GeneralCardInfo'));

export const SupportPage = (props: SupportPageProps) => (
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
				mainHeader="Support"
				subHeader="Need help? Ask for support from our maintenance team"
				icon={<SpaIcon className="content-icon general-info-icon" />}
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

export default connect(mapStateToProps, mapDispatchToProps)(SupportPage);
