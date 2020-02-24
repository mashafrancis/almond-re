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
    props = {
      showModal: true,
      userName: { name: 'Otse' },
      logoutUser: jest.fn(),
    };
    wrapper = mount(<UnauthorizedUserModal { ...props } />);
  });

  it('should render Modal component', () => {
    expect(wrapper.find('Modal')).toHaveLength(1);
  });

  it('should log out and reload app if logoutAndRedirectUser method is called', () => {
    const instance = wrapper.instance() as UnauthorizedUserModal;
    const realReload = location.reload;

    location.reload = jest.fn();
    instance.logoutAndRedirectUser();

    expect(props.logoutUser).toBeCalled();
    expect(location.reload).toBeCalled();

    location.reload = realReload;
  });

  it('should show username', () => {
    const initalState = {
      user: 'Gbenga Oluwole',
    };

    expect(mapStateToProps(initalState)).toMatchObject({ userName: initalState.user });
  });
  it('should pass showModal prop as a prop to the Modal component', () => {
    expect(wrapper.find('Modal').props().showModal).toEqual(props.showModal);
  });

  it('should display a header with the userName', () => {
    expect(wrapper.find('.modal-header').text()).toEqual(`Welcome, ${props.userName.name}!`);
  });

  it('should display the right text in the modal body', () => {
    expect(wrapper.find('.modal-body-text').text()).toEqual(
      'You are currently not authorised to access Activo. Please contact activo@andela.com for more details'
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

      expect(props.userName).toEqual(state.user);
    });
  });
});
