'use strict';

/**
 * Error: Configuration Error
 * @name ConfigError
 * @class
 * @classdesc Configuration Error
 */
module.exports = class ConfigError extends Error {
  /**
   * CTOR, these are the fields
   * @name ConfigError#constructor
   * @function
   * @param {string} configName - Name of missing configuration element
   * @param {string} message    - Helpful correction
   */
  constructor(configName = '(?)', ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConfigError);
    }
    this.name = 'ConfigError';
    this.configName = configName;
  }
};
