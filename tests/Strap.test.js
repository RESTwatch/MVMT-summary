import React from 'react';
import { shallow } from 'enzyme';

import Strap from '../client/src/components/Strap';

describe('Strap component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      strap: {},
      clickHandler: jest.fn()
    };
    wrapper = shallow(<Strap {...props} />, {disableLifecycleMethods: true});
  });

  it('should render without throwing an error', () => {
    expect(wrapper.find('span').length).toBeTruthy;
  });
});
