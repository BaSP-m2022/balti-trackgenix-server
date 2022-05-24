import request from 'supertest';
import app from '../index';
import Admins from '../models/Admins';
import adminsSeed from '../seed/admins';

beforeAll(async () => {
  await Admins.collection.insertMany(adminsSeed);
});

describe('/GET /admins', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.status).toBe(200);
  });

  test('response should return false error', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.error).toBeFalsy();
  });

  test('response should return one admin', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('response should return an admin with the requested ID', async () => {
    const response = await (await request(app).get('/admins/628c2d1c83caa8c896456159')).setEncoding();
    expect(response.error).toBeFalsy();
  });
});

// describe('/');
