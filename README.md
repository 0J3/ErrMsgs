# ErrMsgs

A module for generating error messages

# Installation

```bash
yarn add errmsgs
```

# Usage

## To initialize the module, use

```js
const errMsgGen = new (require("errmsgs"))();
```

## Getting an error message

### Synchronously

```js
errMsgGen.error([Error | String]).then((err) => {
  // do whatever you need with err here
});
```

### Asynchronously

```js
const err = await errMsgGen.error([Error | String]);
```

# Basic Example

```js
// Load the module
const errMsgGen = new (require("errmsgs"))();

// Make the code async
(async () => {
  // Generate the Error Message
  const err = await errMsgGen.error(new Error("Test"));

  // Output the error
  console.error(err);

  // Exit
  process.exit(1);
})();
```

# Notes

I would've made it synchronous if i could, but i sadly couldn't.
