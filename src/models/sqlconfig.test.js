'use strict';

// https://jestjs.io/docs/getting-started
const { describe, expect, test } = require('@jest/globals');
const Utility = require('../library/utility');

const SqlConfig = require('./SqlConfig');

describe('Config class', () => {
  /**
   * TEST: format Config
   */
  test('Config string', () => {
    const config = new SqlConfig('connectionstring');
    const text = config.toString();
    expect(text.includes(';')).toBe(true);
  });

  /**
   * TEST: From JSON
   */
  test('fromJson (ok)', () => {
    let model = new SqlConfig('connectionstring');
    expect(model.isValid()).toBe(true);
    let json = JSON.stringify(model);
    let p2 = SqlConfig.fromJson(json);
    expect(p2.isValid()).toBe(true);
    expect(model.connectionString == p2.connectionString).toBe(true);
  });

  /**
   * TEST: From JSON
   */
  test('fromJson (bad)', () => {
    let config = null;
    try {
      let json = JSON.stringify(config);
      let p2 = SqlConfig.fromJson(json);
      expect(p2 == null).toBe(true);
    } catch (e) {
      console.log(e);
    }
  });

  /**
   * TEST: From Object
   */
  test('fromObject (ok)', () => {
    let config = new SqlConfig('connectionstring');
    expect(config.isValid()).toBe(true);
    let p2 = SqlConfig.fromObject(config);
    expect(p2.isValid()).toBe(true);
    expect(config.connectionString == p2.connectionString).toBe(true);
  });

  test('fromObject (bad)', () => {
    let config = null;
    try {
      const o = {};
      let p2 = Config.fromObject(o);
      expect(p2.isValid()).toBe(false);
    } catch (e) {}
  });

  test('fromObject (null)', () => {
    let config = null;
    try {
      const o = null;
      let p2 = Config.fromObject(o);
      expect(p2.isValid()).toBe(false);
    } catch (e) {}
  });

  test('asConfig', () => {
    const o = {
      connectionString:
        '127.0.0.1,1433;Database=Northwind;User Id=sa;Password=somepass;Encrypt=no;'
    };

    const json = JSON.stringify(o);

    let config = SqlConfig.asConfig(json);

    expect(o.connectionString == config.connectionString).toBe(true);
  });
});
