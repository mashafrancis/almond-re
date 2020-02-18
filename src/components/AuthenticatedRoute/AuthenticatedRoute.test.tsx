// react libraries
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

// third-party libraries
import * as Cookies from 'cookies-js';
import { mount } from 'enzyme';

// components
import AuthenticatedRoute from './';

describe.skip('The AuthenticatedRoute component', () => {
  const TestComponent = () => <div></div>;

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
    Cookies.expire('jwt-token');

    const props = {
      location: {
        pathname: '/analytics',
      },
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={['/settings/people']} initialIndex={0}>
        <AuthenticatedRoute component={TestComponent} {...props} />
      </MemoryRouter>
    );

    expect(wrapper.find('Redirect').props().to).toEqual('/');
  });
});
