import request from 'supertest';
import app from '../index';
import Timesheet from '../models/Time-sheets';
import timesheetsSeed from '../seed/time-sheets';

beforeAll(async () => {
  await Timesheet.collection.insertMany(timesheetsSeed);
});

describe('/GET /timesheets', () => {
  test('Response should return a status 200', async () => {
    const response = await request(app).get('/timesheets').send();
    expect(response.error).toBeFalsy();
  });
  test('Response should return a status 400', async () => {
    const response = await request(app).get('/timesheet').send();
    expect(response.status).toBe(404);
  });
  test('Response should return a non empty body content', async () => {
    const response = await request(app).get('/timesheets').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('Response should return minimum body content', async () => {
    const response = await request(app).get('/timesheets').send();
    expect(Object.keys(response.body.data[0]).length).toBeGreaterThan(5);
  });
});
