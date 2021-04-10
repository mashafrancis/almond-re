// react libraries
import { lazy } from 'react';

// third-party libraries
import { connect } from 'react-redux';

// icons
import { Help } from '@material-ui/icons';

// thunks
import { displaySnackMessage } from '@modules/snack';

// interfaces
import { HelpPageProps } from '@pages/HelpPage/interfaces';
import Grid from '@material-ui/core/Grid';

const GeneralCardInfo = lazy(() => import('@components/GeneralCardInfo'));

export const HelpPage = (props: HelpPageProps): JSX.Element => (
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
				mainHeader="Help"
				subHeader="Get more information more about the system"
				icon={<Help className="content-icon general-info-icon" />}
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

export default connect(mapStateToProps, mapDispatchToProps)(HelpPage);
