import React from 'react';
import { ApplicationHistoryFeed } from './ApplicationHistoryFeed.jsx';
import { shallow }from 'enzyme';


test('renders correctly', () => {
  let component = shallow(
    <ApplicationHistoryFeed session={{appliction:[]}} apps={['something']}/>
  );

  let tree = component.find('div');
  expect(tree.length).toEqual(1);
});

test('should render an array', () => {

});

test('', () => {

});