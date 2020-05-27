import * as React from 'react';

// third-party libraries
import {
  Container,
  Grid,
} from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PhonelinkSetupSharpIcon from '@material-ui/icons/PhonelinkSetupSharp';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// components
import Button from '@components/Button';
import {Cell, Row} from "@material/react-layout-grid";
import MaterialIcon from "@material/react-material-icon";
import NavigationHeader from "@components/NavigationHeader";

// thunk
import { verifyUserDevice } from '@modules/device';
import { displaySnackMessage } from '@modules/snack';
import { getUserDetails } from '@modules/user';
import { UserContext } from "@utils/context";

// styles
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './EnterDeviceIdPage.scss';

// interfaces
import { EnterDeviceIdPageProps, EnterDeviceIdPageState } from './interfaces';

export const EnterDeviceIdPage: React.FunctionComponent<EnterDeviceIdPageProps> = (props) => {
  const [state, setState] = React.useState<EnterDeviceIdPageState>({
    isLoading: false,
  });

  const [deviceId, setDeviceId] = React.useState('');
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeviceId(e.target.value);
  };

  const user = React.useContext(UserContext);

  const onSubmit = async (event) => {
    event.preventDefault();
    const device = { id: deviceId };

    setState({ ...state, isLoading: true });

    props.verifyUserDevice(device)
      .then(async () => {
        await props.getUserDetails();
        setState({ ...state, isLoading: false });
      });
  };

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& input:valid + fieldset': {
          borderColor: '#1967d2',
        },
        '& input:valid:focus + fieldset': {
          borderLeftWidth: 6,
          borderColor: '#1967d2',
          padding: '4px !important', // override inline-style
        },
      },
      margin: {
        margin: theme.spacing(1),
      },
      bottom: {
        position: 'fixed',
        bottom: 0,
        right: 0,
      },
    })
  );

  const classes = useStyles(props);
  const { activeDevice } = user;
  const { history } = props;

  const renderDeviceTextField = () => {
    return (
      <React.Fragment>
        <div className="form-cell">
          <TextField
            label="Enter new device ID"
            defaultValue={deviceId}
            className={`${classes.root} mdc-text-field--fullwidth`}
            variant="outlined"
            onChange={handleValueChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhonelinkSetupSharpIcon style={{ color: '#1967D2' }} />
                </InputAdornment>
              ),
            }}
        />
        </div>
      </React.Fragment>
    );
  };

  const { isLoading } = state;
  return (
    <div className="register">
      <NavigationHeader
        forwardButtonName={activeDevice ? 'Skip' : 'Home'}
        backwardButtonName="Back"
        forwardLink={activeDevice ? '/dashboard' : '/'}
        backwardLink={'/'}
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
            <Button
              type="button"
              name={isLoading ? 'Adding...' : 'Add new device ID'}
              id="cc-register"
              onClick={onSubmit}
              classes="mdc-button big-round-corner-button mdc-button--raised"
            />
          </Cell>
          {/*{ props.user?.activeDevice && skipButton() }*/}
        </Row>
      </Grid>
      </Container>
    </div>
  );
};

export const mapStateToProps = state => ({
  error: state.error,
  isLoading: state.device.isLoading,
  user: state.user.user,
});

export const mapDispatchToProps = dispatch => ({
  verifyUserDevice: id => dispatch(verifyUserDevice(id)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
  getUserDetails: () => dispatch(getUserDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnterDeviceIdPage);
