import React from 'react';
import { shallow } from 'enzyme';

import StrapLoader from '../client/src/components/StrapLoader';

describe('StrapLoader component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      strapSpec: {},
      clickHandler: jest.fn()
    };
    wrapper = shallow(<StrapLoader {...props} />, {disableLifecycleMethods: true});
  });

  it('should render without throwing an error', () => {
    expect(wrapper.find('div').length).toBeTruthy;
  });
});
