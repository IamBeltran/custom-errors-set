/**
 * @file Manage unit tests for the Month class.
 */

// ━━	IMPORT MODULES	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const CustomError = require('../src/CustomError');

// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const NAME = 'ServerError';
const MESSAGE = 'The PORT value is wrong, must be of type number';

const CUSTOM_ERROR_THROW = [
  {
    name: {
      describe: 'CustomError.prototype.constructor: throws',
      test: "An exception 'TypeError' is thrown if 'name' value is not of type 'string'",
    },
    options: { name: true, message: MESSAGE },
    error: TypeError,
  },
  {
    name: {
      describe: 'CustomError.prototype.constructor: throws',
      test: "An exception 'TypeError' is thrown if 'message' value is not of type 'string'",
    },
    options: { name: NAME, message: true },
    error: TypeError,
  },
];

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » THROW TEST
describe.each(CUSTOM_ERROR_THROW)('$name.describe', ({ name, options, error }) => {
  test(name.test, () => {
    expect(() => new CustomError(options.name, options.message)).toThrow(error);
  });
});

describe('CustomError.prototype.addDetails: throws', () => {
  const PORT_ERROR = new CustomError(NAME, MESSAGE);
  test("An exception 'TypeError' is thrown if 'details' value is not of type 'Object'", () => {
    expect(() => PORT_ERROR.addDetails(false)).toThrow(TypeError);
  });
});
