import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/src/components/App';

describe('App', () => {
  it('should GET specs for the target watch', () => {
    const wrapper = shallow(<App />, {disableLifecycleMethods: true});
    const AppState = wrapper.state();
    expect(AppState.watchSpec.toBe(expect.anything()));
  });
});
