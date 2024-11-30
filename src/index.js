'use strict';

/**
 * index.js - Entry Point
 * @name   Index
 * @module ApplicationRoot
 */

const fs = require('node:fs');
const fsp = require('fs').promises;
const path = require('path');
const { exitCode } = require('node:process');

const Utility = require('./library/utility');
const SqlConfig = require('./models/sqlconfig');

/**
 * Where is the app root folder?
 * @global
 */
global.appRoot = path.resolve(__dirname);

/**
 * handle SIGTERM signals gracefully
 */
process.on('SIGTERM', () => {
  const msg = 'Received SIGTERM, performing graceful shutdown.';
  shutdown(-1, msg);
});

/**
 * handle SIGQUIT signals gracefully
 */
process.on('SIGQUIT', () => {
  const msg = 'Received SIGQUIT, performing graceful shutdown.';
  shutdown(-2, msg);
});

/**
 * Orderly shutdown
 * @function
 * @param {number}} exitcode
 * @param {string} msg
 * @returns {void}
 */
function shutdown(exitcode, msg) {
  if (!Utility.isNumber(exitcode)) {
    exitCode = 0;
  }
  if (!Utility.isBlank(msg)) {
    console.log(JSON.stringify(msg));
  }
  process.exit(exitcode);
}

/**
 * Main() Async Entry Point
 */
async function main() {
  /**
   * Argument parsing
   */
  const yargs = require('yargs');

  const commandLineArgs = yargs.option('c', {
    alias: 'config',
    describe: 'path to configuration file',
    type: 'string',
    demandOption: true
  }).argv;

  /**
   * Validate config file exists
   */
  if (!fs.existsSync(commandLineArgs.config)) {
    const msg = `Unable to find '-config' file: $($options.config)`;
    shutdown(8, msg);
  }

  /**
   * Read config file
   */
  let sqlConfig = new SqlConfig('');
  const data = fs.readFileSync(commandLineArgs.config, 'utf8');
  sqlConfig = SqlConfig.asConfig(data);

  shutdown(0, 'Done');
}

main();
