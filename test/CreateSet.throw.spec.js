/**
 * @file Manage unit tests for the Month class.
 */

// ━━	IMPORT MODULES	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const { createSet } = require('../src');

// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const NAME = 'ServerError';
const MESSAGES = {
  PORT_TYPE: 'The PORT value is wrong, must be of type number',
  PORT_NUMBER: number => `The PORT value is wrong, invalid number: ${number}`,
};

const CREATE_SET_THROW = [
  {
    name: {
      describe: 'createSet: throws',
      test: "An 'TypeError' exception is thrown if 'name' value is not of type 'string'",
    },
    options: { name: true, message: MESSAGES },
    error: TypeError,
  },
  {
    name: {
      describe: 'createSet: throws',
      test: "An 'TypeError' exception is thrown if 'messages' value is not of type 'Object'",
    },
    options: { name: NAME, messages: true },
    error: TypeError,
  },
  {
    name: {
      describe: 'createSet: throws',
      test: "An 'TypeError' exception is thrown if 'messages' value is an empty 'Object'",
    },
    options: { name: NAME, messages: {} },
    error: TypeError,
  },
  {
    name: {
      describe: 'createSet: throws',
      test: "An 'TypeError' exception is thrown if any property of `messages` is not of type string or function",
    },
    options: { name: NAME, messages: { PORT_TYPE: true, PORT_NUMBER: [] } },
    error: TypeError,
  },
];

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » THROW TEST
describe.each(CREATE_SET_THROW)('$name.describe', ({ name, options, error }) => {
  test(name.test, () => {
    expect(() => createSet(options.name, options.messages)).toThrow(error);
  });
});
