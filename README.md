# CustomErrorSet

The `CustomErrorSets` module creates and manages custom errors set for all application specific errors.

## Installation

Use the node package manager to install `CustomErrorSet`.

```bash
npm install custom-errors-set
```

## Usage

### Create a CustomError set

```js
// Errors.js

// or const customs = require("./src/");
const { createSet } = require('custom-errors-set');

const ServerError = createSet('SERVER ERROR', {
  PORT_TYPE: 'The PORT value is wrong, must be of type number',
  // DINAMIC ERROR
  PORT_NUMBER: number => `The PORT number is wrong, invalid range: ${number}`,
  NODE_ENV: allowed => `Invalid NODE ENVIRONMENT value, allowed values are: ${allowed.join(', ')}`,
});

// Server.js

// Use especific errors
throw new ServerError('PORT_TYPE');

// Create dinamic errors
const INVALID_PORT = 300;
throw new ServerError('PORT_NUMBER', [INVALID_PORT]);

throw new ServerError('NODE_ENV',[['test', 'production', 'development']]);
```

### Create a CustomError

```js
const { CustomError } = require('custom-errors-set');

const PORT_TYPE_ERROR = new CustomError('SERVER ERROR', 'The PORT value is wrong, must be of type number');

// Add information to the custom error.
PORT_TYPE_ERROR.addDetails({
  type: typeof PORT,
})

throw PORT_TYPE_ERROR;
```

## Documentation

### createSet(name, messages)

The `createSet` method creates a `CustomErrors` with a given name and pre-set message, returns a `class` to create a custom error.

The method requires the parameters `name` and `messages`. The parameter `name` must be `string` type and `messages` must be `Object` type.

The `name` value its the name of the custom error, and `messages`, are all error messages to be used in the set.

Parameters Description:

| Name        | Type      | Attributes  | Description                         |
|-------------|-----------|-------------|-------------------------------------|
| `name`      | `string`  |             | The name of custom error set.       |
| `messages`  | `Object`  |             | All messages for the custom error.  |

Throws:

- A `TypeError` exception is thrown if `name` value is not of type `string`.
- A `TypeError` exception is thrown if `messages` value is not of type `Object`.
- A `TypeError` exception is thrown if `messages` is an empty `Object`.
- A `TypeError` exception is thrown if any property of `messages` is not of type `string` or `function`.

## Constructor `new customError(name, message)`

Creates an instance of `CustomError`.

The `constructor` method requires the `name` and `message` parameters, both parameters must be type `string`.

The `name` parameter indicates the name that the `CustomError` will have, giving specificity to the error. The `message` parameter is the message of the `Customerror`.

Parameters Description:

| Name      | Type      | Attributes  | Description                   |
|-----------|-----------|-------------|-------------------------------|
| `name`    | `string`  |             | The name of custom error set. |
| `message` | `string`  |             | Message for the custom error. |

Throws:

- A `TypeError` exception is thrown if `name` value is not of type `string`.

- A `TypeError` exception is thrown if `message` value is not of type `string`.

### Example

```js
const SERVER_ERROR_PORT = new CustomError('Server Error', 'Missing port value, is required');

```

## `customError.prototype.addDetails(details)`

The `addDetails` method add information to the custom error if required.

The method requires the `details` parameter, must be type `Object`.

Parameters Description:

| Name      | Type      | Attributes  | Description                                   |
|-----------|-----------|-------------|-----------------------------------------------|
| `details` | `Object`  |             | An object with additional error information.  |

Throws:

- A `TypeError` exception is thrown if `details` value is not of type `Object`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
