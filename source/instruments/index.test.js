// Core
import { sum, delay, getUniqueID, getFullApiUrl } from './';

jest.setTimeout(10000)

describe('instruments', () => {
	test('sum function should be a function', () => {
		expect(sum).toBeInstanceOf(Function);
	});

	test('sum function should throw an error when called with non-number type as first argument', () => {
		expect(() => sum('2', 2)).toThrow();
	});

	test('sum function should throw an error when called with non-number type as second argument', () => {
		expect(() => sum(2, 'hi')).toThrow();
	});

	test('sum function should return an addition of two passed arguments', () => {
		expect(sum(2, 3)).toBe(5);
		expect(sum(1, 8)).toMatchSnapshot();
	});

	test('delay function should return a resolved promise', async () => {
		await expect(delay()).resolves.toBeUndefined();
	});

	test('getUniqueID function should be a function', () => {
		expect(getUniqueID).toBeInstanceOf(Function);
	});

	test('getUniqueID function should throw an error when called with non-number type as argument', () => {
		expect(() => getUniqueID('2')).toThrow();
	});

	test('getUniqueID function should return a string of desired length', () => {
		expect(typeof getUniqueID()).toBe('string');
		expect(getUniqueID(5)).toHaveLength(5);
		expect(getUniqueID(1)).toHaveLength(1);
	});

	test('getFullApiUrl function should throw an error when called with non-string type as first argument', () => {
		expect(() => getFullApiUrl(2, 'string')).toThrow();
	});

	test('getFullApiUrl function should throw an error when called with non-string type as second argument', () => {
		expect(() => getFullApiUrl('string', 3)).toThrow();
	});

	test('getFullApiUrl function should return a concatination of passed arguments', () => {
		expect(getFullApiUrl('string1', 'string2')).toBe('string1/string2');
		expect(getFullApiUrl('string1', 'string2')).toMatchSnapshot();
	});
});