import React from 'react';
import { shallow }from 'enzyme';
import { NegotiationPracticeVideo } from './NegotiationPracticeVideo';

test('renders correctly', () => {
  let component = shallow(
    <NegotiationPracticeVideo />
  );

  let tree = component.find('div');
  expect(tree.length).toEqual(1);
});

test('should render an array', () => {

});

test('', () => {

});