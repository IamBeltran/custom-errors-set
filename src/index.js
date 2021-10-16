/**
 * @file Manages CustomErrorsSets module, manages and creates the error sets.
 */

// ━━	IMPORT MODULES	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const { isString, isObject, isEmptyObject, isObjectOf, isArray } = require('./istype');

const CustomError = require('./CustomError');

// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Symbol for the default exported instance.
 *
 * @type {symbol}
 */
const defaultCustomErrorSets = Symbol.for('CustomErrorSets:default');

// ━━	FUNCTIONS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `isValidMessages()` function determines whether a value is of type
 * `Object` and its properties are type of `string` or `Function`.
 *
 * @private
 * @param   {*} messages - The value to be checked.
 * @returns {boolean} `true` if the required conditions are met; otherwise, `false`.
 * @example isValidMessages({ name: 'This is a name' }); // expected value: true
 *
 */
const isValidMessages = messages => isObjectOf(messages, ['string', 'function']);

/**
 * The `createMessage()` function returns an `Object` with information.
 *
 * @private
 * @param   {object} options - Options required for the function.
 * @param   {object} options.messages - Preset messages for the error set.
 * @param   {string} options.key - The reference to the message.
 * @param   {Array} options.params - Required parameters if the message is a function.
 * @returns {object} `true` if the value is empty `Object`; otherwise, `false`.
 * @example createMessage(options);
 *
 */
const createMessage = ({ messages, key, params }) => {
  if (!(key in messages)) {
    return {
      message: 'Warning: This is a default message, checks the message name.',
      valid: true,
      reason: null,
    };
  }

  if (isString(messages[key])) {
    return {
      message: messages[key],
      valid: true,
      reason: null,
    };
  }

  if (!isArray(params)) {
    return {
      message: null,
      valid: false,
      reason: 'If message is a function params is required and must be of type Array',
    };
  }

  const message = messages[key].apply(null, params);

  if (!isString(message)) {
    return {
      message: null,
      valid: false,
      reason: "The message value must be type 'string' or a function that returns a 'string'",
    };
  }
  return {
    message,
    valid: true,
    reason: null,
  };
};

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `CustomErrorsSets` class manages and creates the CustomError sets.
 *
 * @class CustomErrorsSets
 *
 */
class CustomErrorsSets {
  /**
   * Creates an instance of `CustomErrorsSets`.
   *
   * @memberof CustomError
   * @param {object} options - Options required for the method.
   * @param {boolean} options.overwrite - `true` if the error sets can be overwritten; otherwise, `false`.
   * @example const customs = new CustomErrorsSets();
   *
   */
  constructor(options) {
    this.models = {};
    this.options = { overwrite: false, ...options };
  }

  /**
   * The `createSet` method creates a `CustomError` with a given name and
   * pre-set message, returns a `class` to create a custom error.
   *
   * The method requires the parameters `name` and `messages`. The parameter
   * `name` must be `string` type and `messages` must be `Object` type.
   *
   * The `name` value its the name of the custom error, and `messages` are
   * all error messages to be used in the set.
   *
   * - An `TypeError` exception is thrown if `name` value is not of type
   * `string`.
   *
   * - An `TypeError` exception is thrown if `messages` value is not of type
   * `Object`.
   *
   * - An `TypeError` exception is thrown if `messages` is an empty `Object`.
   *
   * - An `TypeError` exception is thrown if any property of `messages` is not
   * of type string or function.
   *
   * @throws
   * @memberof CustomErrors
   * @param   {string} name - The name of the custom error.
   * @param   {object} messages - The messages to be used in the error set.
   * @returns {CustomError} A custom error with preset messages.
   * @example const ServerError = customs.createSet('ServerError', {
   *   PORT_TYPE: 'The PORT value is wrong, must be of type number',
   *   PORT_NUMBER: number => `The PORT value is wrong, invalid number: ${number}`,
   * });
   *
   * try {
   *   throw new ServerError('PORT_TYPE');
   * } catch (error) {
   *   console.error(error);
   * }
   *
   */
  createSet(name, messages) {
    if (!isString(name)) {
      throw new TypeError("The 'name' value must be of type 'string'");
    }
    if (!isObject(messages)) {
      throw new TypeError("The 'messages' value must be of type 'Object'");
    }
    if (isEmptyObject(messages)) {
      throw new TypeError("The 'messages' value must not be an empty 'Object'");
    }
    if (!isValidMessages(messages)) {
      throw new TypeError("The 'message' properties must be of type 'string' or a 'function'");
    }

    // eslint-disable-next-line no-use-before-define
    const $customs = this instanceof CustomErrorsSets ? this : customs;
    // eslint-disable-next-line prefer-destructuring, dot-notation
    const models = $customs['models'];
    const exists = name in models;
    if (exists) {
      throw new Error(`Cannot overwrite the CustomError model: ${name}`);
    }
    const model = CustomErrorsSets.compile(name, messages);
    models[name] = model;
    // eslint-disable-next-line dot-notation
    return $customs['models'][name];
  }

  /**
   * The `compile` static method is compiler utility.
   *
   * - An exception `TypeError` is thrown if `name` value is not of type
   * `string`.
   *
   * - An exception `TypeError` is thrown if `messages` value is not of type
   * `Object`.
   *
   * - An exception `TypeError` is thrown if `messages` is an empty `Object`.
   *
   * - An exception `TypeError` is thrown if `messages` is not of type `Object`
   * with `string` or `function`.
   *
   * @throws
   * @static
   * @memberof  CustomErrorsSets
   * @param   {string} name - The name of `CustomError` set.
   * @param   {object} messages - The messages for the `CustomError` set.
   * @returns {CustomError} TODO ADD DESCRIPTION.
   * @example const number = 1; // TODO ADD EXAMPLE.
   *
   */
  static compile(name, messages) {
    if (!isString(name)) {
      throw new TypeError("The 'name' value must be of type 'string'");
    }
    if (!isObject(messages)) {
      throw new TypeError("The 'messages' value must be of type 'Object'");
    }
    if (isEmptyObject(messages)) {
      throw new TypeError("The 'messages' value must not be an empty 'Object'");
    }
    if (!isValidMessages(messages)) {
      throw new TypeError("The 'message' properties must be of type 'string' or a 'function'");
    }
    /**
     * TODO ADD DESCRIPTION.
     *
     * - An exception `TypeError` is thrown if `name` value is not of type
     * `string`.
     *
     * - An exception `TypeError` is thrown if `messages` value is not of type
     * `Object`.
     *
     * - An exception `TypeError` is thrown if `messages` is an empty `Object`.
     *
     * - An exception `TypeError` is thrown if `messages` is not of type `Object`
     * with `string` or `function`.
     *
     * @throws
     * @param {string} key - TODO ADD DESCRIPTION.
     * @param {Array} params - TODO ADD DESCRIPTION.
     * @returns {CustomError} TODO ADD DESCRIPTION.
     * @example const number = 1; // TODO ADD EXAMPLE.
     *
     */
    const customerror = function customerror(key, params) {
      const { message, valid, reason } = createMessage({ messages, key, params });
      if (!valid) throw new TypeError(reason);
      const instance = new CustomError(name, message);
      return instance;
    };
    Object.setPrototypeOf(customerror, CustomError.prototype);
    return customerror;
  }
}

/**
 * The `CustomError` class creates specific errors types with custom messages.
 *
 * - Usage `new CustomError(name, message);`.
 *
 * @instance
 * @memberof CustomErrorsSets
 * @function CustomError
 * @example throw new CustomError('Server Error', 'The PORT value is wrong, must be of type number');
 *
 */
CustomErrorsSets.prototype.CustomError = CustomError;

/**
 * The exports object is an instance of `CustomErrorsSets`.
 *
 * Manages and creates the CustomError sets for all application specific
 * errors.
 *
 * - Use `custom.model` function to create a CustomError set.
 *
 * - Use `custom.CustomError` function to create a CustomError.
 *
 * @constant customs
 * @type {CustomErrorsSets}
 */
const customs = new CustomErrorsSets({
  [defaultCustomErrorSets]: true,
});

// ━━	EXPORT MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = customs;
