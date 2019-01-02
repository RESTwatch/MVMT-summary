import React from 'react';
import { shallow } from 'enzyme';

import App from '../client/src/components/App.jsx';

describe('App component', () => {
  let wrapper;
  let stateProps;

  beforeEach(() => {
    wrapper = shallow(<App />, {disableLifecycleMethods: true});
    stateProps = wrapper.state();
  });

  it('should render without throwing an error', () => {
    expect(wrapper.find('div').length).toBeTruthy;
  });

  it('should store the watch specs in state', () => {
    expect(stateProps.hasOwnProperty('watchSpec')).toBe(true);
  });
});
