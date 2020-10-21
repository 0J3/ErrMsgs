# ErrMsgs [![Known Vulnerabilities](https://snyk.io/test/npm/errmsgs/1.0.3/badge.svg)](https://snyk.io/test/npm/errmsgs/1.0.3)

A module for generating decent error messages

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

# Sample Output

```yml
// This program is error free! Which is why this is a bug report created by an error from this program!

Sorry, but the application has crashed!

Module Information:
  Name: errmsgs
  Version: 1.0.3
  Author: 0J3 <ErrMsgs@wafflepowered.com> (https://twitter.com/0j3_3)
  Loaded Modules:
    - ./index.js
    - ./package.json
    - balanced-match
    - brace-expansion
    - concat-map
    - debug
    - esprima
    - folder-hash
    - get-caller-file
    - graceful-fs
    - indent-string
    - js-yaml
    - minimatch
    - ms
  Folder Hash: kood8Hwn054zIRrfYLpF8NTXQnY=

Error:
  This is some demo output!
Call Stack:
  at C:\Users\Lannan\ErrMsgs\index.js:86:22
  at processTicksAndRejections (internal/process/task_queues.js:97:5)
```

oh by the way, that text after the `//` at the top, is randomly selected from a list of possible messages

# Notes

I would've made it synchronous if i could, but i sadly couldn't.
