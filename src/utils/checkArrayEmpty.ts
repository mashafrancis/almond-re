/**
 * Checks if an array is empty
 * @returns {boolean}
 */
const isArrayNotNull = (array: number | string[] | object[]): boolean =>
	Array.isArray(array) && Object.keys(array).length > 0;

export default isArrayNotNull;
