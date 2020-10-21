const { hashElement } = require("folder-hash"),
  indentString = require("indent-string"),
  yaml = require("js-yaml"),
  getCallerFile = require("get-caller-file"),
  path = require("path");

class ErrorMessageGen {
  config = {};
  caller = __filename;
  callerDir = __dirname;
  constructor(config) {
    config = config || {};
    config.format =
      config.format ||
      `// {{RANDOMMESSAGE}}

Sorry, but the application has crashed!

Module Information:
  Name: {{NAME}}
  Version: {{VERSION}}
  Author: {{AUTHOR}}
  Loaded Modules:
{{MODULELIST}}  Folder Hash: {{FOLDERHASH}}

Error:
{{ERROR}}
Call Stack:
{{CALLSTACK}}`;
    config.randomMessages = [
      "Wait, so that's what a crash is...",
      "This program is error free! Which is why this is a bug report created by an error from this program!",
      "100% Gay",
      "What if i said... Errors... Are... Bad...?",
      "Made by your mother's deceased grandma's grandfather's AI",
      "Exists™",
      "yeet",
      "So you are looking at an error message right now",
      "This Error Message Generator is made by 0J3#9971",
      "git gud lol",
      "Made using code",
      "Made using braincells",
      "Hey, have you heard of errors? Yeah, this program encountered one.",
      "This program exists apparently 👀",
      "Does this program exist?",
    ];
    this.config = config;
    this.hashConfig = config.hashConfig || {
      folders: { exclude: [".*", "node_modules"] },
      files: { include: ["*.*"], exclude: ["*.ignore", ".gitkeep"] },
    };
    this.caller = getCallerFile();
    this.callerDir = path.resolve(this.caller, "..");
  }

  generateRandomMessage() {
    const config = this.config;
    return config.randomMessages[
      Math.floor(Math.random() * config.randomMessages.length)
    ];
  }

  error(err = new Error("No error specified")) {
    return new Promise(async (res) => {
      let errmsg = this.config.format;

      const hash = await this.generateHashList();

      let packagejson = {
        name: "UNKNOWN",
        author: {
          name: "UNKNOWN",
          email: "UNKNOWN",
          url: "UNKNOWN",
        },
        version: "UNKNOWN",
        main: "UNKNOWN",
        license: "UNKNOWN",
        dependencies: {
          UNKNOWN: "UNKNOWN",
        },
      };
      try {
        packagejson = require(`${this.caller}/../package.json`);
      } catch (error) {}

      let errstack = new Error().stack;

      if (err instanceof Error) {
        err = err.toString();
        err = err.replace("Error: ", "");
      }

      errmsg = errmsg
        .split(`{{FOLDERHASH}}`)
        .join(hash)
        .split(`{{MODULELIST}}`)
        .join(this.generateModuleList())
        .split(`{{RANDOMMESSAGE}}`)
        .join(this.generateRandomMessage())
        .split(`{{NAME}}`)
        .join(`${packagejson.name || "Unknown"}`)
        .split(`{{VERSION}}`)
        .join(`${packagejson.version || "Unknown"}`)
        .split(`{{AUTHOR}}`)
        .join(
          `${JSON.stringify(
            packagejson.author.name || packagejson.author || "Unknown"
          )
            .split('"')
            .join("")}`
        )
        .split(`{{ERROR}}`)
        .join(`${indentString((err || "No Error Specified").toString(), 2)}`)
        .split(`{{CALLSTACK}}`)
        .join(
          `\n${errstack.replace("Error\n", "")}`
            .split("\n    ")
            .join("\n  ")
            .replace("\n", "")
        );

      res(errmsg);
    });
  }
  generateModuleList() {
    let requireCache = Object.keys(require.cache);
    requireCache.forEach((val, index) => {
      val = val.split("\\").join("/");

      if (val.includes("node_modules")) {
        let x = val.split("/");
        let newVal = "";
        let countAfterNodeModules = 0;
        x.forEach((path) => {
          // if is 1
          if (countAfterNodeModules == 1) {
            newVal = path;
          }
          // increment
          if (countAfterNodeModules > 0) {
            countAfterNodeModules = countAfterNodeModules + 1;
          }
          if (path.includes("node_modules")) {
            countAfterNodeModules = 1;
          }
        });
        val = newVal;
      }

      requireCache[index] = val
        .split(path.resolve(this.caller, "..").split("\\").join("/"))
        .join(".");
    });
    requireCache = requireCache.sort();
    requireCache = requireCache.filter(function (elem, pos) {
      return requireCache.indexOf(elem) == pos;
    });
    return indentString(
      yaml
        .safeDump(requireCache)
        .split("- >-\n")
        .join("-")
        .split("-  ")
        .join("- ")
        .split("'")
        .join(""),
      4,
      {
        indent: " ",
      }
    );
  }
  generateHashList() {
    // was originally a list, isnt anymore
    return new Promise((res, rej) => {
      hashElement(".", this.hashConfig)
        .then((hash) => {
          res(hash.hash);
        })
        .catch((error) => {
          rej(`hashing failed: ${error}`);
        });
    });
  }
}

// demo output
if (process.argv.includes("DEMO_OUTPUT"))
  (async () => {
    console.log(
      await new ErrorMessageGen().error(new Error("This is some demo output!"))
    );
  })();

module.exports = ErrorMessageGen;
