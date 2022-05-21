import request from 'supertest';
import app from '../index';
import Timesheet from '../models/Time-sheets';
import timeSheetsSeed from '../seed/time-sheets';

beforeAll(async () => {
  await Timesheet.collection.insertMany(timeSheetsSeed);
});

describe('/GET /timesheets', () => {
  test('return status 200 timesheets', async () => {
    const response = await request(app).get('/timesheets').send();
    expect(response.error).toBeFalsy();
  });
});
