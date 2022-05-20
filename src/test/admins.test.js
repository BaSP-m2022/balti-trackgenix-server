import request from 'supertest';
import app from '../index';
import Admins from '../models/Admins';
import employeesSeed from '../seed/employees';

beforeAll(async () => {
  await Admins.collection.insertMany(employeesSeed);
});

describe('/GET /admins', () => {
  test('return status 200 admins', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.error).toBeFalsy();
  });
});
