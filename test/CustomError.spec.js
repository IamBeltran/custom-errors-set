/**
 * @file Manage unit tests for the Month class.
 */

// ━━	IMPORT MODULES	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const CustomError = require('../src/CustomError');

// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » THROW TEST
describe('Creates an instance of CustomError', () => {
  const ERROR_NAME = 'ServerError';
  const ERROR_MESSAGE = 'The PORT value is wrong, must be of type number';
  const INSTANCE = new CustomError(ERROR_NAME, ERROR_MESSAGE);
  test('The instance properties must match object', () => {
    expect({
      name: INSTANCE.name,
      message: INSTANCE.message,
    }).toEqual(
      expect.objectContaining({
        name: ERROR_NAME,
        message: ERROR_MESSAGE,
      }),
    );
  });
});

describe('Add additional information to the custom error', () => {
  const ERROR_NAME = 'ServerError';
  const ERROR_MESSAGE = 'The PORT value is wrong, must be of type number';
  const PORT = '30';
  const INSTANCE = new CustomError(ERROR_NAME, ERROR_MESSAGE);
  INSTANCE.addDetails({
    value: PORT,
    type: typeof PORT,
  });
  test('The instance properties must match object', () => {
    expect({
      name: INSTANCE.name,
      message: INSTANCE.message,
      value: INSTANCE.value,
      type: INSTANCE.type,
    }).toEqual(
      expect.objectContaining({
        name: ERROR_NAME,
        message: ERROR_MESSAGE,
        value: PORT,
        type: typeof PORT,
      }),
    );
  });
});
