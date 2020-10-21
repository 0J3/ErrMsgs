// Load the module
const errMsgGen = new (require("."))();

// Make the code async
(async () => {
  // Generate the Error Message
  const err = await errMsgGen.error(new Error("Test"));

  // Output the error
  console.log(err); // log instead of error, as if log is silenced, the test doesn't need to output anything

  // Exit
  process.exit(0); // with 0, so that the test doesn't fail, as it is doing as intended
})();
