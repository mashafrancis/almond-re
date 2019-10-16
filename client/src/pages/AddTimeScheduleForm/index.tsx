import * as React from 'react';

// third-party libraries
import DateFnsUtils from '@date-io/date-fns';
import {
  Container,
  Grid,
  IconButton,
  InputAdornment
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  TimePicker,
} from '@material-ui/pickers';
import MaterialIcon from '@material/react-material-icon';
import { connect } from 'react-redux';

// components
import AuthHeader from 'components/AuthHeader';
import Button from 'components/Button';

// thunks
import { displaySnackMessage } from 'modules/snack';
import { addNewSchedule } from 'modules/timeSchedules';

// styles
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './AddTimeScheduleForm.scss';

// interfaces
import { AddTimeScheduleFormProps, AddTimeScheduleFormState } from './interfaces';

export const AddTimeScheduleForm: React.FunctionComponent<AddTimeScheduleFormProps> = (props) => {
  const [state, setState] = React.useState<AddTimeScheduleFormState>({
    fields: {},
    isLoading: false,
    isValid: true,
    focused: false,
    errors: {},
  });

  const [selectedTimeSchedule, handleSelectedTimeSchedule] = React.useState(new Date());

  /**
   * Handles the submission on successful validation
   *
   * @param {event} event DOM event
   *
   * @returns {void}
   */
  const onSubmit = (event) => {
    event.preventDefault();
    const schedule = {
      time: selectedTimeSchedule,
    };

    setState({ ...state, isLoading: true });

    props.addNewSchedule(schedule)
      .then(() => {
        setState({ ...state, isLoading: false });
      });
  };

  const renderTimeScheduleForm = () => {
    return (
      <React.Fragment>
        <div className="form-cell">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TimePicker
              className="mdc-text-field--fullwidth"
              name="time_schedule"
              inputVariant="outlined"
              label="New time schedule"
              value={selectedTimeSchedule}
              onChange={handleSelectedTimeSchedule}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton href={'#'}>
                      <MaterialIcon role="button" icon="alarm" initRipple={null}/>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </MuiPickersUtilsProvider>
          <p
            className="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg
            mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg"
            aria-hidden="false" />
        </div>
      </React.Fragment>
    );
  };

  return (() => {
    const { isLoading } = state;

    return (
      <div className="register">
        <AuthHeader
          forwardButtonName="Home"
          backwardButtonName="Back"
          forwardLink={'/'}
          backwardLink={'/water-cycles'}
        />
        <Container maxWidth="sm">
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <h1 className="headline-2">Add a time schedule</h1>
              <h5>The watering schedule for the pumping time is used to control
                the number of cycles the water is going to be pumped through the system.
                The maximum number of minutes to pump through the system is set
                at default to be 15 mins.
              </h5>
            </Grid>
            <Grid container direction="row" spacing={2}>
              <Grid item xs>
                {renderTimeScheduleForm()}
              </Grid>
            </Grid>
            <Grid item xs >
              <Button
                  type="button"
                  name={isLoading ? 'Adding...' : 'Add new schedule'}
                  id="cc-register"
                  onClick={onSubmit}
                  classes="mdc-button big-round-corner-button mdc-button--raised"
                />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  })();
};

export const mapStateToProps = state => ({
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  addNewSchedule: schedule => dispatch(addNewSchedule(schedule)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTimeScheduleForm);
