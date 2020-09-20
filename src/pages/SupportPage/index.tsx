// react libraries
import React, { lazy } from 'react';

// third-party libraries
import { Cell, Row } from '@material/react-layout-grid';
import { connect } from 'react-redux';
import SpaIcon from '@material-ui/icons/Spa';

// interfaces
import { SupportPageProps } from '@pages/SupportPage/interfaces';

// thunk
import { displaySnackMessage } from '@modules/snack';

// components
const GeneralCardInfo = lazy(() => import('@components/GeneralCardInfo'));

export const SupportPage = (props: SupportPageProps) => (
	<>
		<Row>
			<Cell
columns={7} desktopColumns={7} tabletColumns={8} phoneColumns={4}>
				{window.innerWidth < 539 && (
					<div className="main-subheader">
						<h3>Help</h3>
					</div>
				)}
			</Cell>
		</Row>
		<Row>
			<Cell columns={12} desktopColumns={12} tabletColumns={8} phoneColumns={4}>
				<GeneralCardInfo
					mainHeader="Support"
					subHeader="Need help? Ask for support from our maintenance team"
					icon={<SpaIcon className="content-icon general-info-icon" />}
				/>
			</Cell>
		</Row>
	</>
);

export const mapStateToProps = (state) => ({
	error: state.error,
});

export const mapDispatchToProps = (dispatch) => ({
	displaySnackMessage: (message) => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SupportPage);
