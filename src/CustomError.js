/**
 * @file Manages CustomError module, create specific error types with custom
 * messages.
 */

// ━━	IMPORT MODULES	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const { isString, isObject } = require('./istype');

// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Constant to identify reserved keywords.
 *
 * @private
 * @constant {Set.<string>} NOT_ALLOWED
 */
const NOT_ALLOWED = new Set(['__proto__', 'prototype', 'constructor']);

// ━━	FUNCTIONS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `CustomError` class creates specific errors types with custom messages.
 *
 * @class    CustomError
 * @augments Error
 *
 */
class CustomError extends Error {
  /**
   * Creates an instance of `CustomError`.
   *
   * The `constructor` method requires the `name` and `message` parameters, both
   * parameters must be type `string`.
   *
   * The `name` parameter indicates the name that the `CustomError` will have,
   * giving specificity to the error. The `message` parameter is the message of
   * the `Customerror`.
   *
   * - An `TypeError` exception is thrown if `name` value is not of type
   * `string`.
   *
   * - An `TypeError` exception is thrown if `message` value is not of type
   * `string`.
   *
   * @throws
   * @memberof CustomError
   * @param {string} name - Error's name.
   * @param {string} message - Error's message.
   * @example const message = 'Missing port value, is required';
   * const SERVER_ERROR_PORT = new CustomError('Server Error', message);
   *
   */
  constructor(name, message) {
    if (!isString(name)) {
      throw new TypeError('The name value must be type String');
    }
    if (!isString(message)) {
      throw new TypeError('The message value must be type String');
    }
    super(message);
    // ⇒ FIX: CustomError [name]: .toLocaleUpperCase()
    this.name = name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }

  /**
   * The `addDetails` method add information to the custom error if required.
   *
   * The method requires the `details` parameter, must be type `Object`.
   *
   * - An `TypeError` exception is thrown if `details` value is not of type
   * `Object`.
   *
   * @throws
   * @memberof CustomError
   * @param {object} details - The Error details.
   * @returns {this} The customError with details.
   * @example const message = 'The PORT value is wrong, must be of type number';
   * const PORT_SERVER_ERROR = new CustomError('ServerError', message);
   *
   * PORT_SERVER_ERROR.addDetails({
   *   type: typeof PORT,
   * });
   *
   */
  addDetails(details) {
    if (!isObject(details)) {
      throw new TypeError(`The 'details' value must be type Object`);
    }
    const entries = Object.entries(details).filter(([key]) => !NOT_ALLOWED.has(key));
    const filtered = Object.fromEntries(entries);
    Object.assign(this, filtered);
    return this;
  }
}

// ━━	EXPORT MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * CustomError module, create specific error types with custom messages.
 *
 * @module CustomError
 */
module.exports = CustomError;
