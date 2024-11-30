'use strict';

const Utility = require('../library/utility');

/**
 * @name SqlConfig
 * @class
 * @classdesc Model of a Configuration in our System
 */
module.exports = class SqlConfig {
  /**
   * CTOR, these are the fields
   * @name SqlConfig#constructor
   * @function
   * @param {string} connectionString

   */
  constructor(connectionString) {
    this.connectionString = connectionString;
  }

  /**
   * Semi-Colon separated list of fields for debugging
   * @static
   * @name SqlConfig#toString
   * @function
   * @param {Class} SqlConfig
   * @returns {String}
   */
  static toString(SqlConfig) {
    const s = `${SqlConfig.connectionString};${SqlConfig.queue};${SqlConfig.dryRun};`;
    return s;
  }

  /**
   * Parse json string into class instance
   * @static
   * @function
   * @param {json} text - configuration as json text
   * @returns {SqlConfig}
   */
  static asConfig(text) {
    let model = null;
    let o = JSON.parse(text);
    let cs = o.connectionString;
    let queue = o.queue;
    let dryRun = o.dryRun;
    model = new SqlConfig(cs);
    return model;
  }

  /**
   * For this instance return a Semi-Colon separated list of fields for debugging
   * @instance
   * @name SqlConfig#toString
   * @function
   * @function
   * @returns {String}
   */
  toString() {
    return SqlConfig.toString(this);
  }

  /**
   * Parse SqlConfig from Json
   * @static
   * @name SqlConfig#fromJson
   * @function
   * @param {String} json
   * @returns {SqlConfig} - SqlConfig or {null}
   */
  static fromJson(json) {
    let p = null;
    try {
      const o = JSON.parse(json);
      // console.log(Object.getOwnPropertyNames(o));
      p = new SqlConfig(o.connectionString);
    } catch (e) {
      p = null;
    }
    return p;
  }

  /**
   * Parse SqlConfig from Object
   * @static
   * @name SqlConfig#fromObject
   * @function
   * @param {Object} o
   * @returns {Class} SqlConfig
   */
  static fromObject(o) {
    let p = null;
    if (o == null) {
      p = null;
    } else {
      p = new SqlConfig(o.connectionString);
    }
    return p;
  }

  /**
   * Returns true if this SqlConfig has the required fields
   * @instance
   * @name SqlConfig#isValid
   * @function
   * @returns {Boolean}
   */
  isValid() {
    return !Utility.isBlank(this.connectionString);
  }
};
