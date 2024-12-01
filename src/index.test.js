'use strict';

const { TYPES } = require('tedious');
const { describe, expect, test } = require('@jest/globals');

const BlitzDb = require('./database/index');

afterAll(async () => {});

describe('open a db', () => {
  test('OK Parameters', async () => {
    const dbname = process.env.BLITZSQLNAME ?? '';
    const password = process.env.BLITZSQLPASS ?? '';
    const port = parseInt(process.env.BLITZSQLPORT, 10) ?? 0;

    const db = BlitzDb.getDb(dbname, password, port);
    expect(db != null).toBe(true);

    await db.destroy();
  });

  test('Bad Port', async () => {
    const dbname = process.env.BLITZSQLNAME ?? '';
    const password = process.env.BLITZSQLPASS ?? '';
    const port = 0;

    try {
      const db = BlitzDb.getDb(dbname, password, port);
      expect(false).toBe(true);
    } catch {
      expect(true).toBe(true);
    } finally {
      // await db.destroy();
    }
  });

  test('Bad Password', async () => {
    const dbname = process.env.BLITZSQLNAME ?? '';
    const password = '';
    const port = parseInt(process.env.BLITZSQLPORT, 10) ?? 0;

    try {
      const db = BlitzDb.getDb(dbname, password, port);
      expect(false).toBe(true);
    } catch {
      expect(true).toBe(true);
    } finally {
      // await db.destroy();
    }
  });

  test('Bad DB Name', async () => {
    const dbname = '';
    const password = process.env.BLITZSQLPASS ?? '';
    const port = parseInt(process.env.BLITZSQLPORT, 10) ?? 0;

    try {
      const db = BlitzDb.getDb(dbname, password, port);
      expect(false).toBe(true);
    } catch {
      expect(true).toBe(true);
    } finally {
      // await db.destroy();
    }
  });
});

describe('regular query', () => {
  test('Read all records', async () => {
    const dbname = process.env.BLITZSQLNAME ?? '';
    const password = process.env.BLITZSQLPASS ?? '';
    const port = parseInt(process.env.BLITZSQLPORT, 10) ?? 0;

    const db = BlitzDb.getDb(dbname, password, port);
    expect(db != null).toBe(true);

    const results = await db
      .select('StuffId', 'Name', 'Priority')
      .from('[dbo].[Stuff]');

    for (const r of results) {
      console.log(r.StuffId, r.Name, r.Priority);
    }

    await db.destroy();
  });

  test('Insert', async () => {
    const dbname = process.env.BLITZSQLNAME ?? '';
    const password = process.env.BLITZSQLPASS ?? '';
    const port = parseInt(process.env.BLITZSQLPORT, 10) ?? 0;

    const db = BlitzDb.getDb(dbname, password, port);
    expect(db != null).toBe(true);

    const id = await db
      .insert({ Name: 'Insert Eggs', Priority: 3 })
      .into('Stuff');
    console.log(id);

    await db.destroy();
  });
});

describe('Optimistic Locking', () => {});
