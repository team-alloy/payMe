import React from 'react';
import { ApplicationHistoryFeed } from './ApplicationHistoryFeed.jsx';
import renderer from 'react-test-renderer';


test('renders correctly', () => {
  let component = renderer.create(
    <ApplicationHistoryFeed />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render an array', () => {

});

test('', () => {

});