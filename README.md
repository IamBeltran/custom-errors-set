# CustomErrorSet

Create a custom errors set for all application specific errors.

## Installation

Use the node package manager to install `CustomErrorSet`.

```bash
npm install custom-errors-set
```

## Usage

```js
// Errors.js

const { model, CustomError } = require('custom-errors-set');
// or const customs = require("./src/");

const ServerError = createSet('SERVER ERROR', {
  PORT_TYPE: 'The PORT value is wrong, must be of type number',
  PORT_NUMBER: number => `The PORT number is wrong, invalid range: ${number}` // dinamic error
});

const DatabaseError = createSet('DATABASE ERROR', {
  MISSING_COLLECTION: 'The collection name is missing, its value is required',
});

exports.ServerError = ServerError;
exports.DatabaseError = DatabaseError;

// dbConfig.js
try {
  if( )

} catch (error) {
  console.error('++',error.constructor);
  // console.error(error.toString());
  // console.error(`${error.name}`);
  // console.error(error.message);
  // console.error(error.stack);
  // console.error('-------------');
  // console.error(error);
}




```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
