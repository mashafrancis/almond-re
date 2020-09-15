import React from 'react';

// third-party libraries
import {
  Cell,
  Row
} from '@material/react-layout-grid';
import { connect } from 'react-redux';
import GeneralCardInfo from '@components/GeneralCardInfo';
import MemoryTwoToneIcon from '@material-ui/icons/MemoryTwoTone';

// thunks
import { displaySnackMessage } from '@modules/snack';

// styles
import './EnergyMonitoringPage.scss';

// interfaces
import {
  EnergyMonitoringPageProps
} from './interfaces';

export const EnergyMonitoringPage = (props: EnergyMonitoringPageProps): JSX.Element =>
    <>
      <Row>
        <Cell columns={7} desktopColumns={7} tabletColumns={8} phoneColumns={4}>
          {(window.innerWidth < 539) && <div className="main-subheader"><h3>EnergyMonitoring</h3></div>}
        </Cell>
      </Row>
      <Row>
        <Cell columns={12} desktopColumns={12} tabletColumns={8} phoneColumns={4}>
          <GeneralCardInfo
            mainHeader="Energy Monitoring"
            subHeader="Power readings from the system and daily usage"
            icon={<MemoryTwoToneIcon className="content-icon general-info-icon" />}
            />
        </Cell>
      </Row>
    </>
  ;

export const mapStateToProps = state => ({
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnergyMonitoringPage);
