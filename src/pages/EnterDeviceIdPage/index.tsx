import * as React from 'react';

// third-party libraries
import {
  Container,
  Grid,
  InputAdornment,
  TextField
} from '@material-ui/core';
import {
  PhonelinkSetupSharp
} from '@material-ui/icons';
import { connect } from 'react-redux';

// components
import { Cell, Row } from '@material/react-layout-grid';
import NavigationHeader from '@components/NavigationHeader';

// thunk
import { verifyUserDevice } from '@modules/device';
import { displaySnackMessage } from '@modules/snack';
import { getUserDetails } from '@modules/user';
import { UserContext } from '@context/UserContext';

// styles
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './EnterDeviceIdPage.scss';
import useStyles from '@pages/EnterDeviceIdPage/styles';

// interfaces
import {
  EnterDeviceIdPageProps,
  EnterDeviceIdPageState,
  StateToProps
} from './interfaces';

export const EnterDeviceIdPage: React.FunctionComponent<EnterDeviceIdPageProps> = props => {
  const [state, setState] = React.useState<EnterDeviceIdPageState>({
    isLoading: false,
  });

  const [deviceId, setDeviceId] = React.useState('');
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeviceId(e.target.value);
  };

  const user = React.useContext(UserContext);

  const onSubmit = () => {
    const device = { id: deviceId };
    setState({ ...state, isLoading: true });

    props.verifyUserDevice(device)
      .then(() => {
        // await props.getUserDetails();
        setState({ ...state, isLoading: false });
        window.location.replace('/dashboard');
      });
  };

  const classes = useStyles(props);
  const { activeDevice } = user;

  const renderDeviceTextField = () =>
      <>
        <div className="form-cell">
          <TextField
            label="Enter new device ID"
            defaultValue={deviceId}
            className={`${classes.root} mdc-text-field--fullwidth`}
            variant="outlined"
            onChange={handleValueChange}
            InputProps={{
              startAdornment:
                <InputAdornment position="start">
                  <PhonelinkSetupSharp style={{ color: '#1967D2' }} />
                </InputAdornment>
              ,
            }}
            />
        </div>
      </>
    ;

  const { isLoading } = state;
  return (
    <div className="register">
      <NavigationHeader
        forwardButtonName={activeDevice ? 'Skip' : 'Home'}
        backwardButtonName="Back"
        forwardLink={activeDevice ? '/dashboard' : '/'}
        backwardLink="/"
        />
      <Container maxWidth="sm">
      <Grid>
        <Row>
          <Cell columns={12} desktopColumns={12} tabletColumns={8} phoneColumns={4}>
            <h1 className="headline-2">Add device identifier</h1>
            <h5>The device ID will help you to control your purchased device from Almond.
              Kindly enter the 6 digit figure to start using your system. Configuration with
              the device might take a few minutes to complete.
            </h5>
          </Cell>
        </Row>
        <Row className="device-id-page">
          <Cell columns={12} desktopColumns={12} tabletColumns={8} phoneColumns={4}>
          {renderDeviceTextField()}
          </Cell>
        </Row>
        <Row className="device-id-page">
          <Cell columns={8} desktopColumns={8} tabletColumns={4} phoneColumns={2}>
            <button
              className="mdc-button mdc-button--raised"
              onClick={onSubmit}>
              <span className="mdc-button__label">
                {isLoading ? 'Adding...' : 'Add new device ID'}
              </span>
            </button>
          </Cell>
        </Row>
      </Grid>
      </Container>
    </div>
  );
};

export const mapStateToProps = (state: StateToProps) => ({
  error: state.error,
  isLoading: state.device.isLoading,
});

export const mapDispatchToProps = (dispatch: any) => ({
  verifyUserDevice: (id: string) => dispatch(verifyUserDevice(id)),
  displaySnackMessage: (message: string) => dispatch(displaySnackMessage(message)),
  getUserDetails: () => dispatch(getUserDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnterDeviceIdPage);
