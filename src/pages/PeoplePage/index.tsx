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
import Modal from '@components/Modal';
import Table from '@components/Table';
import { createStyles, TextField, Theme } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FaceIcon from '@material-ui/icons/Face';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';

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
import Chip from "@material-ui/core/Chip";
import GeneralCardInfo from "@components/GeneralInfoCard";

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

export const PeoplePage: React.FunctionComponent<PeoplePageProps> = (props) => {
  const [state, setState] = React.useState<PeoplePageState>({
    people: [],
    isFetchingRoles: false,
    isSelectOpen: false,
    roleSelect: '',
    roleId: '',
    userId: '',
  });

  const styles = useStyles(props);

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
    event.persist();
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

    props.updatePerson(userId, { role: roleId }).then(() =>
      setState({
        ...state,
        isSelectOpen: !state.isSelectOpen,
        userId: '',
      })
    );
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
            <h4>{role.title}</h4>
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
      <h6 id={id}>{role}</h6>
      <ArrowDropDownRoundedIcon
        id={id}
        onClick={toggleRoleSelectOpen}
      />
    </div>
    );
  };

  const TableContent = (users) => {
    const tableHeaders = {
      Name: { valueKey: 'name', colWidth: '40' },
      Devices: { valueKey: 'devices' },
      Role: { valueKey: 'role' },
      Status: { valueKey: 'status' },
    };

    const tableValues = users.map(user => ({
      id: user[1]._id,
      name: userNamePhoto(user),
      devices: user[1].devices[0].id,
      role: rolesSelectMore(user[1].currentRole?.title, user[1]._id),
      status: user[1].isVerified
        ? <Chip className="MuiChip-root-enabled" label="Active" />
        : <Chip className="MuiChip-root-unverified" label="Inactive" />
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
          <GeneralCardInfo
            mainHeader="People"
            subHeader="List of all users under Almond"
            icon={<PeopleAltOutlinedIcon className="content-icon general-info-icon" />}
          />
          <div className="user-roles-page__table">
            { TableContent(Object.entries(props.people)) }
          </div>
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
