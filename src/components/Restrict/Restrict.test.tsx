// jest mocks
import '../../../tests/__mocks__/storeWithPartialPermissions';

// react library
import * as React from 'react';

// third-party libraries
import { mount } from 'enzyme';

// components
import { Restrict } from '@components/Restrict';

describe.skip('The Restrict component', () => {
  it('should render children prop if user has required access', () => {
    const wrapper = mount(
      <Restrict authorize={['centers:edit']}>
        <button />
      </Restrict>
    );

    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('should not render children prop if user does not have required access', () => {
    const wrapper = mount(
      <Restrict authorize={['people:edit']}>
        <button />
      </Restrict>
    );

    expect(wrapper.find('button')).toHaveLength(0);
  });

  it('should render fallback prop if user does not have required access', () => {
    const wrapper = mount(
      <Restrict authorize={['people:edit']} fallback={<span />}>
        <button />
      </Restrict>
    );

    expect(wrapper.find('span')).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(0);
  });
});
