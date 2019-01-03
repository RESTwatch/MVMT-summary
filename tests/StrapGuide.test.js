import React from 'react';
import { shallow } from 'enzyme';

import StrapGuide from '../client/src/components/StrapGuide';

describe('StrapGuide component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      series: ''
    };
    wrapper = shallow(<StrapGuide {...props} />, {disableLifecycleMethods: true});
  });

  it('should render without throwing an error', () => {
    expect(wrapper.find('span').length).toBeTruthy;
  });

  it('should render the modal component', () => {
    expect(wrapper.find('Modal').length).toBeTruthy;
  });
});
