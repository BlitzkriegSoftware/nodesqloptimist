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

    const result = await db
      .insert({ Name: 'Insert Eggs', Priority: 3 })
      .into('Stuff');
    console.log('Result', result);

    await db.destroy();
  });

  test('update', async () => {
    const dbname = process.env.BLITZSQLNAME ?? '';
    const password = process.env.BLITZSQLPASS ?? '';
    const port = parseInt(process.env.BLITZSQLPORT, 10) ?? 0;

    const db = BlitzDb.getDb(dbname, password, port);
    expect(db != null).toBe(true);

    const result = await db('Stuff')
      .where('StuffId', '=', 1)
      .update({ Priority: 1 });
    console.log('Result', result);

    await db.destroy();
  });

  test('delete', async () => {
    const dbname = process.env.BLITZSQLNAME ?? '';
    const password = process.env.BLITZSQLPASS ?? '';
    const port = parseInt(process.env.BLITZSQLPORT, 10) ?? 0;

    const db = BlitzDb.getDb(dbname, password, port);
    expect(db != null).toBe(true);
    const result = await db('Stuff').where('StuffId', '>', 5).delete();
    console.log('Result', result);

    await db.destroy();
  });
});

describe('Optimistic Locking', () => {
  test('Experiment 1', async () => {
    const dbname = process.env.BLITZSQLNAME ?? '';
    const password = process.env.BLITZSQLPASS ?? '';
    const port = parseInt(process.env.BLITZSQLPORT, 10) ?? 0;

    const db = BlitzDb.getDb(dbname, password, port);
    expect(db != null).toBe(true);

    // There must be at least 2 CPU cores for this to run
    const numCores = require('os').cpus().length;
    expect(numCores).toBeGreaterThan(1);
    if (numCores >= 2) {
    }
    await db.destroy();
  });
  test('Experiment 2', async () => {
    const dbname = process.env.BLITZSQLNAME ?? '';
    const password = process.env.BLITZSQLPASS ?? '';
    const port = parseInt(process.env.BLITZSQLPORT, 10) ?? 0;

    const db = BlitzDb.getDb(dbname, password, port);
    expect(db != null).toBe(true);
    // There must be at least 2 CPU cores for this to run
    const numCores = require('os').cpus().length;
    expect(numCores).toBeGreaterThan(1);
    if (numCores >= 2) {
    }

    await db.destroy();
  });
});
