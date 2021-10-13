/**
 * @file Manage unit tests for the Month class.
 */

// ━━	IMPORT MODULES	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const { createSet } = require('../src');

// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » THROW TEST
describe('Creates an CustomErrors set', () => {
  const ERROR_NAME = 'ServerError';
  const ERROR_MESSAGES = {
    PORT_TYPE: 'The PORT value is wrong, must be of type number',
    PORT_NUMBER: number => `The PORT value is wrong, invalid number: ${number}`,
  };
  const ServerError = createSet(ERROR_NAME, ERROR_MESSAGES);
  const PORT_TYPE_ERROR = new ServerError('PORT_TYPE');
  const PORT_NUMBER_ERROR = new ServerError('PORT_NUMBER', [300]);

  test('The instance properties must match object', () => {
    expect({
      name: PORT_TYPE_ERROR.name,
      message: PORT_TYPE_ERROR.message,
    }).toEqual(
      expect.objectContaining({
        name: ERROR_NAME,
        message: ERROR_MESSAGES.PORT_TYPE,
      }),
    );
  });
  test('The instance properties must match object', () => {
    expect({
      name: PORT_NUMBER_ERROR.name,
      message: PORT_NUMBER_ERROR.message,
    }).toEqual(
      expect.objectContaining({
        name: ERROR_NAME,
        message: ERROR_MESSAGES.PORT_NUMBER(300),
      }),
    );
  });
});
