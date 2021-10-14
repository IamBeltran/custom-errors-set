/**
 * @file Manages functions that are useful for type validation, search of
 * properties, etc.
 */

// ━━ CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * A regular expression to find the matches in a `string`.
 *
 * @private
 * @constant {RegExp} regex
 */
const regex = /\s([a-z|A-Z]+)/;

// ━━ FUNCTIONS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `toString()` method returns a `string` representing the `Object`.
 *
 * @private
 * @param   {*} value - The value to be checked.
 * @returns {string} A `string` representing the `Object`.
 * @example const tostring = toString(true); // [object Boolean]
 *
 */
const toString = value => ({}.toString.call(value));

/**
 * The `toType()` method returns a `string` indicating the type of the
 * unevaluated operand.
 *
 * @private
 * @param   {*} value - The value to be checked.
 * @returns {string} The type of the unevaluated operand.
 * @example toType(true); // 'boolean'
 *
 */
const toType = value => toString(value).match(regex)[1].toLocaleLowerCase();

// ━━ MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IS TYPE
/**
 * The `isArray()` function determines whether a value is `Array` or not.
 *
 * @private
 * @param   {*} value - The value to be checked.
 * @returns {boolean} `true` if the given value is Array; otherwise, `false`.
 * @example isArray([1, 2]); // expected value: true
 *
 */
const isArray = value => Array.isArray(value);

/**
 * The `isFunction()` function determines whether a value is `Function` or not.
 *
 * @private
 * @param   {*} value - The value to be checked.
 * @returns {boolean} `true` if the value is `Function`; otherwise, `false`.
 * @example isFunction(() => {}); // expected value: true
 *
 */
const isFunction = value => toString(value) === '[object Function]';

/**
 * The `isString()` function determines whether a value is `String` or not.
 *
 * @private
 * @param   {*} value - The value to be checked.
 * @returns {boolean} `true` if the given value is `String`; otherwise, `false`.
 * @example isString('Hello world'); // expected value: true
 *
 */
const isString = value => toString(value) === '[object String]';

// » IS OBJECT
/**
 * The `isObject()` function determines whether a value is `Object` or not.
 *
 * @private
 * @param   {*} value - The value to be checked.
 * @returns {boolean} `true` if the given value is `Object`; otherwise, `false`.
 * @example isObject({ color: 'blue' }); // expected value: true
 *
 */
const isObject = value => toString(value) === '[object Object]';

/**
 * The `isEmptyObject()` function determines whether a value is an empty
 * `Object` or not.
 *
 * @private
 * @param   {*} value - The value to be checked.
 * @returns {boolean} `true` if the value is empty `Object`; otherwise, `false`.
 * @example isEmptyObject({}); // expected value: true
 *
 */
const isEmptyObject = value => isObject(value) && Object.getOwnPropertyNames(value).length === 0;

/**
 * The `isObjectOf()` function determines whether a value is an `Object` with
 * properties that contains expected types of value or not.
 *
 * @private
 * @param   {object} object - The `Object` to be tested.
 * @param   {Array.<string>} types - The expected types of values.
 * @returns {boolean} `true` if all `Object` properties are the expected types; otherwise, `false`.
 * @example isObjectOf({ a: 1, b: 2 }, ['number']); // expected value: true
 *
 */
const isObjectOf = (object, types) =>
  isObject(object) &&
  Object.keys(object)
    .map(key => toType(object[key]))
    .map(type => types.includes(type))
    .every(boolean => !!boolean);

// ━━	EXPORT MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isObject = isObject;
exports.isEmptyObject = isEmptyObject;
exports.isObjectOf = isObjectOf;
