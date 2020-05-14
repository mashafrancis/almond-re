import * as React from 'react';

// third-party libraries
import {
  Cell,
  Grid,
  Row
} from '@material/react-layout-grid';
import { connect } from 'react-redux';

// thunks
import { displaySnackMessage } from '@modules/snack';
import SecurityTwoToneIcon from '@material-ui/icons/SecurityTwoTone';
import GeneralCardInfo from "@components/GeneralInfoCard";

// styles
import './QualityCheckPage.scss';

// interfaces
import {
  QualityCheckPageProps,
  QualityCheckPageState
} from './interfaces';

export const QualityCheckPage: React.FunctionComponent<QualityCheckPageProps> = (props) => {
  const [state, setState] = React.useState<QualityCheckPageState>({
    isEditMode: false,
    schedules: [],
    isDeleteModal: false,
    action: '',
    id: '',
    statusClass: '',
    isEnabled: false,
  });

  return (
    <Grid>
      <Row>
        <Cell columns={7} desktopColumns={7} tabletColumns={8} phoneColumns={4}>
          {(window.innerWidth < 539) && <div className="main-subheader"><h3>QualityCheck</h3></div>}
        </Cell>
      </Row>
      <Row>
        <Cell columns={12} desktopColumns={12} tabletColumns={8} phoneColumns={4}>
          <GeneralCardInfo
            mainHeader="Quality Check"
            subHeader="Tests for water quality, salts and ph level"
            icon={<SecurityTwoToneIcon className="content-icon general-info-icon" />}
          />
        </Cell>
      </Row>
    </Grid>
  );
};

export const mapStateToProps = state => ({
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QualityCheckPage);
