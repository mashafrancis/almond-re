import { renderContent, singleElement } from './index';

// third party libraries
import { mount } from 'enzyme';

describe('The skeleton loader helper function', () => {
  it('should render the loading element n-times', () => {
    const wrapper = mount(renderContent(2, 'rows'));

    expect(wrapper.find('.rows').length).toBe(1);
    expect(wrapper.find('.loading').length).toBe(2);
  });

  it('should return a single loader element', () => {
    const wrapper = mount(singleElement('rows'));

    expect(wrapper.find('.rows__item').length).toBe(1);
    expect(wrapper.find('.loading').length).toBe(1);
  });
});
