import React from 'react';
import { shallow } from 'enzyme';

import App from '../../src/components/App';
import Participant from '../../src/components/participant/Participant';
import Notification from '../../src/components/notification/Notification';

it('renders child components', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('div.App-container')).toHaveLength(1);
  expect(wrapper.find('div.App')).toHaveLength(1);
  expect(wrapper.find('img.App-logo')).toHaveLength(1);
  expect(wrapper.contains(<Participant className="table"/>)).toEqual(true);
  expect(wrapper.contains(<Notification />)).toEqual(true);
});
