# CustomErrorSet

Create a custom errors set for all application specific errors.

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
const { createSet, CustomError } = require('custom-errors-set');

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

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
