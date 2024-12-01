'use strict';

// https://jestjs.io/docs/getting-started
const { describe, expect, test } = require('@jest/globals');
const Utility = require('../library/utility');

const ConfigError = require('./configerror');
const { config } = require('yargs');

describe('ConfigError', () => {
  test('throw catch', () => {
    const configName = 'TestConfig';
    const message = 'Please supply a valid environment variable';
    try {
      throw new ConfigError(configName, message);
    } catch (e) {
      if (e instanceof ConfigError) {
        expect(e.name == 'ConfigError').toBe(true);
        expect(e.configName == configName).toBe(true);
        expect(e.message == message).toBe(true);
      } else {
        fail('Not a specific instance of ConfigError');
      }
    }
  });
});
