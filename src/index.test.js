'use strict';

const { TYPES } = require('tedious');
const { describe, expect, test } = require('@jest/globals');

const Utility = require('./library/utility');
const ConfigError = require('./models/configerror');

describe('open a db', () => {
  test('OK Parameters', () => {
    const dbname = process.env.BLITZSQLNAME ?? '';
    const password = process.env.BLITZSQLPASS ?? '';
    const port = parseInt(process.env.BLITZSQLPORT, 10) ?? 0;

    const BlitzDb = require('./database/index');
    const db = BlitzDb.getDb(dbname, password, port);
    expect(db != null).toBe(true);
  });

  test('Bad Port', () => {
    const dbname = process.env.BLITZSQLNAME ?? '';
    const password = process.env.BLITZSQLPASS ?? '';
    const port = 0;

    const BlitzDb = require('./database/index');
    try {
      const db = BlitzDb.getDb(dbname, password, port);
      expect(false).toBe(true);
    } catch {
      expect(true).toBe(true);
    }
  });

  test('Bad Password', () => {
    const dbname = process.env.BLITZSQLNAME ?? '';
    const password = '';
    const port = parseInt(process.env.BLITZSQLPORT, 10) ?? 0;

    const BlitzDb = require('./database/index');
    try {
      const db = BlitzDb.getDb(dbname, password, port);
      expect(false).toBe(true);
    } catch {
      expect(true).toBe(true);
    }
  });

  test('Bad DB Name', () => {
    const dbname = '';
    const password = process.env.BLITZSQLPASS ?? '';
    const port = parseInt(process.env.BLITZSQLPORT, 10) ?? 0;

    const BlitzDb = require('./database/index');
    try {
      const db = BlitzDb.getDb(dbname, password, port);
      expect(false).toBe(true);
    } catch {
      expect(true).toBe(true);
    }
  });
});

describe('regular query', () => {});

describe('Optimistic Locking', () => {});
