// react
import * as React from 'react';

// third-party libraries
import { mount } from 'enzyme';

// components
import { mapDispatchToProps, mapStateToProps, UnauthorizedUserModal } from './';

describe('UnauthorizedUserModal component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { assign: jest.fn() }
    });

    Object.defineProperty(window.location, 'reload', {
      writable: true,
      value: { assign: jest.fn() }
    });

    props = {
      isModalOpen: true,
      user: { name: 'Francis Masha' },
      logoutUser: jest.fn(),
    };
    wrapper = mount(<UnauthorizedUserModal { ...props } />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render Modal component', () => {
    expect(wrapper.find('Modal')).toHaveLength(1);
  });

  it('should log out and reload app if logoutAndRedirectUser method is called', () => {
    const instance = wrapper.instance() as UnauthorizedUserModal;
    const realReload = window.location.reload;

    window.location.reload = jest.fn();
    instance.logoutAndRedirectUser();

    expect(props.logoutUser).toBeCalled();
    expect(window.location.reload).toBeCalled();

    window.location.reload = realReload;
  });

  it('should show username', () => {
    const initialState = {
      user: 'Francis Masha',
    };

    expect(mapStateToProps(initialState)).toMatchObject({ user: initialState.user });
  });

  it('should pass showModal prop as a prop to the Modal component', () => {
    expect(wrapper.find('Modal').props().isModalOpen).toEqual(props.isModalOpen);
  });

  it('should display a header with the user name', () => {
    expect(wrapper.find('.modal-header').text()).toEqual(`Welcome, ${props.user.name}`);
  });

  it('should display the right text in the modal body', () => {
    expect(wrapper.find('.modal-content').text()).toEqual(
      'You are currently not authorised to access Almond. Please contact almond.froyo@gmail.com for more details.'
    );
  });

  describe('The mapDispatchToProps function', () => {
    let dispatch;
    let props;

    beforeEach(() => {
      dispatch = jest.fn();
      props = mapDispatchToProps(dispatch);
    });

    it('should map logoutUser to props', () => {
      props.logoutUser();
      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe('should mapStateToProps', () => {
    it('should return the expected props objects', () => {
      const state = {
        user: [],
      };
      const props = mapStateToProps(state);

      expect(props.user).toEqual(state.user);
    });
  });
});
