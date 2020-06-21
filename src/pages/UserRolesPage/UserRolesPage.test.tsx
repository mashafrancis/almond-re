// react libraries
import { Location } from 'history';
import * as React from 'react';

// third party
import {mount, shallow} from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

// components
import {
  UserRolesPage,
  mapDispatchToProps,
  mapStateToProps
} from './index';

describe('The User Roles page', () => {
  let wrapper;
  let props;

  props = {
    getUserRoles: jest.fn(() => Promise.resolve()),
    createNewRole: jest.fn(() => Promise.resolve()),
    deleteUserRole: jest.fn(() => Promise.resolve()),
    editUserRole: jest.fn(() => Promise.resolve()),
    displaySnackMessage: jest.fn(() => Promise.resolve()),
  }

  beforeEach(() => {
    wrapper = shallow(
      <BrowserRouter>
        <UserRolesPage {...props}/>
    </BrowserRouter>
  );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    const state = {
      userRoles: {
        isLoading: true
      },
    };

    const props = mapStateToProps(state);

    it('should map user roles page props from state', () => {
      expect(props.userRoles).toEqual(state.userRoles);
      expect(props.isLoading).toEqual(state.userRoles.isLoading);
    });
  });

  describe('mapDispatchToProps', () => {
    let dispatch;
    let props;

    beforeEach(() => {
      dispatch = jest.fn();
      props = mapDispatchToProps(dispatch) as any;
    });

    afterEach(() => {
      dispatch = props = null;
    });

    it('ensures getUserRoles is mapped to props', () => {
      props.getUserRoles();
      expect(dispatch).toHaveBeenCalled();
    });

    it('ensures createNewRole is mapped to props', () => {
      props.createNewRole();
      expect(dispatch).toHaveBeenCalled();
    });

    it('ensures deleteUserRole is mapped to props', () => {
      props.deleteUserRole();
      expect(dispatch).toHaveBeenCalled();
    });

    it('ensures editUserRole is mapped to props', () => {
      props.editUserRole();
      expect(dispatch).toHaveBeenCalled();
    });

    it('ensures displaySnackMessage is mapped to props', () => {
      props.displaySnackMessage();
      expect(dispatch).toHaveBeenCalled();
    })
  });
});
