// react libraries
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

// third-party libraries
import * as Cookies from 'js-cookie';
import { mount } from 'enzyme';

// components
import AuthenticatedRoute from './';

describe('The AuthenticatedRoute component', () => {
  const TestComponent = () => <div/>;

  it('mounts the component if the user is authenticated', () => {
    const authToken = 'SOME_RANDOM_TOKEN';
    Cookies.set('jwt-token', authToken);

    const wrapper = mount(
      <MemoryRouter>
        <AuthenticatedRoute component={TestComponent} />
      </MemoryRouter>
    );
    expect(wrapper.find(TestComponent).length).toBe(1);
  });

  it('redirects the user to root (/) if the user is NOT authenticated', () => {
    Cookies.remove('jwt-token');

    const props = {
      location: {
        pathname: '/dashboard',
      },
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
        <AuthenticatedRoute component={TestComponent} {...props} />
      </MemoryRouter>
    );

    expect(wrapper.find('Redirect').props().to).toEqual('/');
  });
});
