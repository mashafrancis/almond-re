import * as React from 'react';

// third-party libraries
import {
  Cell,
  Row,
} from '@material/react-layout-grid';
import { connect } from 'react-redux';
import {
  SecurityTwoTone,
} from '@material-ui/icons';

// thunks
import { displaySnackMessage } from '@modules/snack';

// styles
import './QualityCheckPage.scss';

// interfaces
import {
  QualityCheckPageProps,
} from './interfaces';

// components
const GeneralCardInfo = React.lazy(() => import('@components/GeneralCardInfo'));

export const QualityCheckPage: React.FunctionComponent<QualityCheckPageProps> = props => {

  return (
    <>
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
            icon={<SecurityTwoTone className="content-icon general-info-icon"/>}
          />
        </Cell>
      </Row>
    </>
  );
};

export const mapStateToProps = state => ({
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QualityCheckPage);
