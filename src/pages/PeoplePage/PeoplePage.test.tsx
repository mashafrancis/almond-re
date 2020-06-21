// react libraries
import { Location } from 'history';
import * as React from 'react';

// third party
import {mount, shallow} from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

// components
import {mapDispatchToProps, mapStateToProps, PeoplePage} from './index';

describe('The People Page', () => {
  let wrapper;
  let props;

  props = {
    getAllPeople: jest.fn(() => Promise.resolve()),
    getUserRoles: jest.fn(() => Promise.resolve()),
    displaySnackMessage: jest.fn(() => Promise.resolve()),
    updatePerson: jest.fn(() => Promise.resolve()),
    people: [],
    roles: [],
  };

  beforeEach(() => {
    wrapper = shallow(
      <BrowserRouter>
        <PeoplePage {...props}/>
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
      people: {
        people: []
      },
      userRoles: {
        data: []
      }
    };

    const props = mapStateToProps(state);

    it('should map people page props from state', () => {
      expect(props.people).toEqual(state.people.people);
      expect(props.roles).toEqual(state.userRoles.data);
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
    })

    it('ensures getAllPeople is mapped to props', () => {
      props.getAllPeople();
      expect(dispatch).toHaveBeenCalled();
    });

    it('ensures getUserRoles is mapped to props', () => {
      props.getUserRoles();
      expect(dispatch).toHaveBeenCalled();
    });

    it('ensures updatePerson is mapped to props', () => {
      props.updatePerson();
      expect(dispatch).toHaveBeenCalled();
    });

    it('ensures displaySnackMessage is mapped to props', () => {
      props.displaySnackMessage();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
