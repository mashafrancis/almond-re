import { lazy } from 'react';

// third-party libraries
import { connect } from 'react-redux';
import { SecurityTwoTone } from '@material-ui/icons';

// thunks
import { displaySnackMessage } from '@modules/snack';

// styles
import './QualityCheckPage.scss';

// interfaces
import Grid from '@material-ui/core/Grid';
import { QualityCheckPageProps } from './interfaces';

// components
const GeneralCardInfo = lazy(
	() => import('@components/molecules/GeneralCardInfo'),
);

export const QualityCheckPage = (props: QualityCheckPageProps): JSX.Element => (
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
				mainHeader="Quality Check"
				subHeader="Tests for water quality, salts and ph level"
				icon={<SecurityTwoTone className="content-icon general-info-icon" />}
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

export default connect(mapStateToProps, mapDispatchToProps)(QualityCheckPage);
