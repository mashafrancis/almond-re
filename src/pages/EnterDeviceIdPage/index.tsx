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
import AuthHeader from '@components/AuthHeader';
import Button from '@components/Button';

// thunk
import { verifyUserDevice } from '@modules/device';
import { displaySnackMessage } from '@modules/snack';
import { getUserDetails } from '@modules/user';

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

  const onSubmit = async (event) => {
    event.preventDefault();
    const device = {
      id: deviceId,
    };

    setState({ ...state, isLoading: true });

    const devicePresent = props.user.devices.find(device => device.id === deviceId);
    if (devicePresent) {
      await props.displaySnackMessage('The ID is already in your available devices. Add another or skip.');
      setState({ ...state, isLoading: false });
    } else {
      props.verifyUserDevice(device)
        .then(async () => {
          await props.getUserDetails();
          setState({ ...state, isLoading: false });
        });
    }
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
                  <PhonelinkSetupSharpIcon />
                </InputAdornment>
              ),
            }}
        />
        </div>
      </React.Fragment>
    );
  };

  const renderBottomNavigation = () => (
    <NavLink to={'/analytics'}>
      <BottomNavigation
        showLabels
        className={classes.bottom}
      >
        <BottomNavigationAction label="SKIP" icon={<ArrowForwardIcon />} />
      </BottomNavigation>
    </NavLink>
  );

  return (() => {
    const { isLoading } = state;

    return (
      <div className="register">
        <AuthHeader
          forwardButtonName=""
          backwardButtonName=""
          forwardLink={'/'}
          backwardLink={'/'}
        />
        <Container maxWidth="sm">
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <h1 className="headline-2">Add device identifier</h1>
              <h5>The device ID will help you to control your purchased device from Almond.
                Kindly enter the 6 digit figure to start using your system. Configuration with
                the device might take a few minutes to complete.
              </h5>
            </Grid>
            <Grid container direction="row" spacing={2}>
              <Grid item xs>
                {renderDeviceTextField()}
              </Grid>
            </Grid>
            <Grid item xs >
              <Button
                type="button"
                name={isLoading ? 'Adding...' : 'Add new device ID'}
                id="cc-register"
                onClick={onSubmit}
                classes="mdc-button big-round-corner-button mdc-button--raised"
              />
            </Grid>
            {renderBottomNavigation()}
          </Grid>
        </Container>
      </div>
    );
  })();
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
