// react libraries
import * as React from 'react';

// third-party libraries
import { mount } from 'enzyme';

// components
import PermissionAccess from '@components/PermissionAccess';

describe('PermissionAccess', () => {
  let wrapper;
  let props;

  props = {
    resources: [{
      id: '-LRMFJKImI8MWB-HJc2y',
      name: 'Centers',
    }],
    permissions: [
      { id: 'LMS', type: 'Full Access' },
      { id: 'LMSC', type: 'View' },
      { id: 'LMC', type: 'Add' },
      { id: 'LMSSC', type: 'Edit' },
      { id: 'LMSCA', type: 'Delete' },
    ],
    getResources: jest.fn(),
  };
  wrapper = mount(<PermissionAccess {...props } />);

  it('should render the component without error', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should set the state of resources and permissions with props passed to component', () => {
    expect(wrapper.state().resources).toEqual(props.resources);
    expect(wrapper.state().permissions).toEqual(props.permissions);
  });

  it('should render each permission per checkbox for a single resource', () => {
    expect(wrapper.find('input[type="checkbox"]').length).toEqual(5);
  });

  it('should check view checkbox for Center when checked', () => {
    expect(wrapper.find('checkbox-container__checkbox-unchecked').length).toBe(0);
    wrapper.find('input[type="checkbox"]').at(1).simulate('click');
    expect(props.getResources).toHaveBeenCalled();
    expect(wrapper.find('CheckBox div').at(1).props().className).toBe('checkbox-container__checkbox-checked');
    expect(wrapper.state().resources[0].permissionIds.length).toBe(1);
    expect(wrapper.state().resources[0].permissionIds).toContain('LMSC');
  });

  it('should uncheck view permission for Center resource when unchecked', () => {
    wrapper.find('input[type="checkbox"]').at(1).simulate('click');
    expect(wrapper.find('CheckBox div').at(1).props().className).toBe('checkbox-container__checkbox-unchecked');
    expect(wrapper.state().resources[0].permissionIds.length).toBe(0);
  });

  it('should check all checkboxes for a resource when "Full Access" is checked ', () => {
    wrapper.find('input[type="checkbox"]').at(0).simulate('click');
    expect(wrapper.find('checkbox-container__checkbox-unchecked').length).toBe(0);
  });

  it('should uncheck all checkboxes for a resource when "Full Access" is unchecked ', () => {
    wrapper.find('input[type="checkbox"]').at(0).simulate('click');
    expect(wrapper.find('checkbox-container__checkbox-checked').length).toBe(0);
  });

  it('should uncheck "Edit" and "Full access" when edit checkbox is unchecked', () => {
    wrapper.find('input[type="checkbox"]').at(0).simulate('click');
    wrapper.find('input[type="checkbox"]').at(3).simulate('click');
    expect(wrapper.find('.checkbox-container__checkbox-unchecked').length).toBe(2);
    expect(wrapper.find('CheckBox div').at(0).props().className).toBe('checkbox-container__checkbox-unchecked');
    expect(wrapper.find('CheckBox div').at(3).props().className).toBe('checkbox-container__checkbox-unchecked');
    expect(wrapper.find('.checkbox-container__checkbox-checked').length).toBe(3);
  });
});
