// react libraries
import * as React from 'react';

// third-party libraries
import { Cell, Grid, Row } from '@material/react-layout-grid';
import { connect } from "react-redux";
const GeneralCardInfo = React.lazy(() => import('@components/GeneralInfoCard'));

// icons
import {
  Settings,
  Help
} from '@material-ui/icons';

// thunks
import { displaySnackMessage } from "@modules/snack";

// interfaces
import { HelpPageProps } from "@pages/HelpPage/interfaces";

export const HelpPage: React.FunctionComponent<HelpPageProps> = (props) => {
  return (
    <React.Fragment>
      <Grid>
        <Row>
          <Cell columns={7} desktopColumns={7} tabletColumns={8}
                phoneColumns={4}>
            {(window.innerWidth < 539) &&
            <div className="main-subheader"><h3>Help</h3></div>}
          </Cell>
        </Row>
        <Row>
          <Cell columns={12} desktopColumns={12} tabletColumns={8} phoneColumns={4}>
            <GeneralCardInfo
              mainHeader="Help"
              subHeader="Get more information more about the system"
              icon={<Help className="content-icon general-info-icon" />}
            />
          </Cell>
        </Row>
      </Grid>
    </React.Fragment>
  )
}

export const mapStateToProps = state => ({
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HelpPage);
