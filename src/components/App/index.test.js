import React from 'react';
import { shallow } from 'enzyme';
import App from './';

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
});
