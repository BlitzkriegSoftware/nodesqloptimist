'use strict';

const Utility = require('../library/utility');
const { TYPES } = require('tedious');
const ConfigError = require('../models/configerror');

module.exports = class BlitzDb {
  /**
   * CTOR, these are the fields
   * @name BlitzDb#constructor
   * @function

   */

  /**
   * Get a DB Connection
   * @param {String} dbName
   * @param {String} dbPassword
   * @param {Number} dbPort
   */
  static getDb(dbName, dbPassword, dbPort) {
    if (dbPort <= 0) {
      throw new ConfigError('dbPort', 'Must be > 0');
    }
    if (Utility.isBlank(dbPassword)) {
      throw new ConfigError('dbPassword', 'Not be blank');
    }
    if (Utility.isBlank(dbName)) {
      throw new ConfigError('dbName', 'Not be blank');
    }

    const knex = require('knex')({
      client: 'mssql',
      connection: {
        user: 'sa',
        password: dbPassword,
        server: '127.0.0.1',
        port: dbPort,
        database: dbName,
        options: {
          mapBinding: (value) => {
            // bind all strings to varchar instead of nvarchar
            if (typeof value === 'string') {
              return {
                type: TYPES.VarChar,
                value
              };
            }

            // allow devs to pass tedious type at query time
            if (value != null && value.type) {
              return {
                type: value.type,
                value: value.value
              };
            }

            // undefined is returned; falling back to default mapping function
          }
        }
      }
    });

    return knex;
  }
};
