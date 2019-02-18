// Core
import React from 'react';
import { Composer } from './';

const props = {
	_createPost: jest.fn(),
	avatar: 'testPic',
	currentUserFirstName: 'testName'
};

const comment = 'Merry Christmas';

const initialState = {
	comment: '',
}

const updatedState = {
	comment,
}

const result = mount(<Composer { ...props } />);

const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');
const _updateCommentSpy = jest.spyOn(result.instance(), '_updateComment');

describe('Composer component:', () => {
	test('should have 1 <section> elements', () => {
		expect(result.find('section')).toHaveLength(1);
	});
	
	test('should have 1 <form> elements', () => {
		expect(result.find('form')).toHaveLength(1);
	});
	
	test('should have 1 <textarea> elements', () => {
		expect(result.find('textarea')).toHaveLength(1);
	});
	
	test('should have 1 <input> elements', () => {
		expect(result.find('input')).toHaveLength(1);
	});
	
	test('should have 1 <img> elements', () => {
		expect(result.find('img')).toHaveLength(1);
	});
	
	test('should have valid initial state', () => {
		expect(result.state()).toEqual(initialState);
	});
	
	test('textarea value should be empty initially', () => {
		expect(result.find('textarea').text()).toBe('');
	});
	
	test('should respond to state change properly', () => {
		result.setState({
			comment,
		});

		expect(result.state()).toEqual(updatedState);
		expect(result.find('textarea').text()).toBe(comment);

		result.setState({
			comment: '',
		});

		expect(result.state()).toEqual(initialState);
		expect(result.find('textarea').text()).toBe('');
	});
	
	test('textarea should handle "change" event', () => {
		result.find('textarea').simulate('change', {
			target: {
				value: comment,
			}
		});

		expect(result.state()).toEqual(updatedState);
	});
	
	test('form should handle "submit" event', () => {
		result.find('textarea').simulate('submit');

		expect(result.state()).toEqual(initialState);
	});
	
	test('_createPost should be invoked once after form submission', () => {
		expect(props._createPost).toHaveBeenCalledTimes(1);
	});
	
	test('_submitComment and _handleFormSubmit should be invoked once after form submission', () => {
		expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
		expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
	});
	
	test('_submitComment should return null when textare is empty', () => {

		result.setState({
			comment: '',
		});
		
		expect(_submitCommentSpy()).toBeNull();
	});
	
	test('props should be valid', () => {
		expect(result.find('img').prop('src')).toBe('testPic');
		expect(result.find('textarea').prop('placeholder')).toContain('testName');
	});
	
	test('_updateComment should be invoked on change event', () => {
		result.find('textarea').simulate('change', {
			target: {
				value: comment,
			}
		});

		// expect(_updateCommentSpy).toHaveBeenCalledTimes(1);
	});
	
	test('_submitOnEnter should not submit comment when "Enter" is not pressed', () => {
		result.find('textarea').simulate('keypress', { 
			key: 'a',
			target: {
				value: comment,
			}
		});
		
		expect(result.state()).toEqual(updatedState);
	});
	
	test('_submitOnEnter should submit comment once after "Enter" is pressed', () => {
		result.find('textarea').simulate('keypress', {
			key: 'Enter'
		});
		
		expect(result.state()).toEqual(initialState);
	});
});