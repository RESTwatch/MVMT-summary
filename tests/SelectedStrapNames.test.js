import React from 'react';
import { shallow } from 'enzyme';

import SelectedStrapNames from '../client/src/components/SelectedStrapNames.jsx';

describe('SelectedStrapNames component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      names: []
    };
    wrapper = shallow(<SelectedStrapNames {...props} />, {disableLifecycleMethods: true});
  });

  it('should render without throwing an error', () => {
    expect(wrapper.find('span').length).toBeTruthy;
  });
});
