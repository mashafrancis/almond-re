import * as React from 'react';

// third-party libraries
import MenuItem from '@material-ui/core/MenuItem';
import {
  Cell,
  Grid,
  Row
} from '@material/react-layout-grid';
import { connect } from 'react-redux';

// component
import ActionButton from '@components/ActionButton';
import DashboardCard from '@components/DashboardCard';
import Modal from '@components/Modal';
import Table from '@components/Table';
import { createStyles, TextField, Theme } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FaceIcon from '@material-ui/icons/Face';
import MaterialIcon from '@material/react-material-icon';

// thunks
import { getAllPeople, updatePerson } from '@modules/people';
import { displaySnackMessage } from '@modules/snack';
import { getUserRoles } from '@modules/userRoles';

// styles
import './PeoplePage.scss';

// interfaces
import {
  PeoplePageProps,
  PeoplePageState
} from './interfaces';

export const PeoplePage: React.FunctionComponent<PeoplePageProps> = (props) => {
  const [state, setState] = React.useState<PeoplePageState>({
    people: [],
    isFetchingRoles: false,
    isSelectOpen: false,
    roleSelect: '',
    roleId: '',
    userId: '',
  });

  React.useEffect(() => {
    const getAllPeople = async () => {
      await props.getAllPeople();
    };
    getAllPeople().then(() => setState({ ...state, people: props.people }));
  },              []);

  React.useEffect(() => {
    props.getUserRoles().then(() => setState({ ...state, isFetchingRoles: false }));
  },              []);

  const toggleRoleSelectOpen = (event) => {
    setState({
      ...state,
      isSelectOpen: !state.isSelectOpen,
      userId: event.target.id,
    });
  };

  const handleRoleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const roleTitle = event.target.value;
    const role = props.roles.filter(obj => obj.title === roleTitle);
    setState({ ...state, roleId: role[0]._id, roleSelect: roleTitle });
  };

  const handleChangeRole = (event) => {
    event.preventDefault();
    const { roleId, userId } = state;

    props.updatePerson(userId, { role: roleId }).then(toggleRoleSelectOpen);
  };

  const userNamePhoto = user => (
    <span className="mini-username">
      <img
        className="mini-username__image"
        src={user[1].photo}
        alt="avatar"
      />
      <span>{user[1].name || 'Anonymous'}</span>
    </span>
  );

  const useStyles = makeStyles((theme: Theme) => createStyles({
    focused: {},
    listItemPadding: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    selectHeight: {
      height: '1.25em',
    },
    labelColor: {
      '&$focused': {
        color: `rgba(${25},${103},${210},${0.87})`,
      },
    },
    font: {
      fontFamily: '"Google Sans", "Roboto", "Helvetica Neue", sans-serif !important',
    },
  }));

  const styles = useStyles(props);

  const selectRoleContent = roles => (
    <React.Fragment>
      <h5>Change the role for the specific user.</h5>
      <TextField
        id="device"
        select
        variant="outlined"
        label="device"
        fullWidth
        size="small"
        value={state.roleSelect}
        onChange={handleRoleSelect}
        SelectProps={{
          classes: {
            selectMenu: styles.selectHeight,
          },
        }}
        InputLabelProps={{
          classes: {
            focused: styles.focused,
            root: styles.labelColor,
          },
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">
            <FaceIcon style={{ color: '#1967D2' }} />
          </InputAdornment>,
        }}>
        {roles.map(role => (
          <MenuItem key={role._id} value={role.title}>
            <h5 className="heading-4">{role.title}</h5>
          </MenuItem>
        ))}
      </TextField>
    </React.Fragment>
  );

  const SelectRoleModal = roles => (
    <Modal
      isModalOpen={state.isSelectOpen}
      renderHeader={() => 'Select user role'}
      renderContent={() => selectRoleContent(roles)}
      onClose={toggleRoleSelectOpen}
      submitButtonName="Update role"
      onSubmit={handleChangeRole}
      onDismiss={toggleRoleSelectOpen}
    />
  );

  const rolesSelectMore = (role, id) => {
    return (
    <div className="table-roles" id={id} onClick={toggleRoleSelectOpen}>
      <h5 id={id}>{role}</h5>
      <MaterialIcon
        id={id}
        onClick={toggleRoleSelectOpen}
        hasRipple icon="more_horiz"
        initRipple={null}
      />
    </div>
    );
  };

  const TableContent = (users) => {
    const tableHeaders = {
      Name: { valueKey: 'name', colWidth: '50' },
      Role: { valueKey: 'role' },
      Status: { valueKey: 'status' },
    };

    const tableValues = users.map(user => ({
      name: userNamePhoto(user),
      role: rolesSelectMore(user[1].currentRole.title, user[1]._id),
      status: user[1]._id,
    }));

    return (
      <Table
        keys={tableHeaders}
        values={tableValues}
      />
    );
  };

  return (
    <Grid>
      <Row>
        <Cell columns={12} desktopColumns={12} tabletColumns={8} phoneColumns={4}>
          <DashboardCard
            classes=""
            heading="People"
            actionItem={
              <ActionButton
                name="Filter"
                icon="filter_list"
              />
            }
            body={
              <React.Fragment>
                <div className="user-roles-page__table">
                  { TableContent(Object.entries(props.people)) }
                </div>
              </React.Fragment>
            }
          />
          {SelectRoleModal(props.roles)}
        </Cell>
      </Row>
    </Grid>
  );
};

export const mapStateToProps = state => ({
  error: state.error,
  people: state.people.people,
  roles: state.userRoles.data,
});

export const mapDispatchToProps = dispatch => ({
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
  getAllPeople: () => dispatch(getAllPeople()),
  getUserRoles: () => dispatch(getUserRoles()),
  updatePerson: (id, role) => dispatch(updatePerson(id, role)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage);
