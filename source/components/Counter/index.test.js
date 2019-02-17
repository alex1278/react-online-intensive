// Core
import React from 'react';
import Counter from './';
import Renderer from 'react-test-renderer';

const renderTree = Renderer.create(<Counter count = { 3 }/>).toJSON();

describe('instruments', () => {
	test('Counter component sould correspond to its snapshot counterpart', () => {
		expect(renderTree).toMatchSnapshot();
	});
});