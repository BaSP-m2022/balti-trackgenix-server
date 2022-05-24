import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index';
import Timesheet from '../models/Time-sheets';
import Employees from '../models/Employees';
import Projects from '../models/Projects';
import Tasks from '../models/Tasks';
import timesheetsSeed from '../seed/time-sheets';
import employeeSeed from '../seed/employees';
import projectSeed from '../seed/projects';
import taskSeed from '../seed/tasks';

beforeAll(async () => {
  await Timesheet.collection.insertMany(timesheetsSeed);
  await Employees.collection.insertMany(employeeSeed);
  await Projects.collection.insertMany(projectSeed);
  await Tasks.collection.insertMany(taskSeed);
});

describe('/GET get all timesheets', () => {
  test('Response should return a status 200', async () => {
    const response = await request(app).get('/timesheets').send();
    expect(response.status).toBe(200);
  });
  test('Response should return a status 400', async () => {
    const response = await request(app).get('/timesheets/wrong-endpoint').send();
    expect(response.status).toBe(400);
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

describe('/GET get timesheets by id', () => {
  test('Response should return a status 200', async () => {
    const response = await request(app).get('/timesheets/6285b864f52d378096258169').send();
    expect(response.status).toBe(200);
  });
  test('Response should return a status 400', async () => {
    const response = await request(app).get('/timesheets/wrong-endpoint').send();
    expect(response.status).toBe(400);
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

describe('POST create timesheet', () => {
  test('Response should return error because we are not sending data', async () => {
    const response = await request(app).post('/timesheets').send();
    expect(response.error).toBeTruthy();
  });
  test('Create response should return a status 201', async () => {
    const response = await request(app).post('/timesheets').send(
      {
        employee: mongoose.Types.ObjectId('6288f73964ed6961bb7c2075'),
        project: mongoose.Types.ObjectId('6288f73964ed6961bb7c2076'),
        role: 'qa',
        rate: 10,
        workedHours: 33,
        description: 'Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
        task: mongoose.Types.ObjectId('6288f73964ed6961bb7c2077'),
      },
    );
    expect(response.status).toBe(201);
  });
  test('Create response should return error validation', async () => {
    const response = await request(app).post('/timesheets').send(
      {
        employee: 'fakeId',
        project: mongoose.Types.ObjectId('6288f73964ed6961bb7c2076'),
        role: 'qa',
        rate: 10,
        workedHours: 33,
        description: 'Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
        task: mongoose.Types.ObjectId('6288f73964ed6961bb7c2077'),
      },
    );
    // eslint-disable-next-line no-underscore-dangle
    expect(response.body.message._message).toEqual('Timesheet validation failed');
  });
  test('Create response should return error validation', async () => {
    const response = await request(app).post('/timesheets').send(
      {
        employee: mongoose.Types.ObjectId('6288f73964ed6961bb7c2075'),
        project: mongoose.Types.ObjectId('6288f73964ed6961bb7c2076'),
        role: 'qa',
        rate: 'worngTypeToBeTested',
        workedHours: 33,
        description: 'Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
        task: mongoose.Types.ObjectId('6288f73964ed6961bb7c2077'),
      },
    );
    expect(response.body.data).toEqual('"rate" must be a number');
  });
});

describe('PUT edit timesheet', () => {
  test('Edit response should return a status 200', async () => {
    const response = await request(app).put('/timesheets/6285b864f52d378096258169').send(
      {
        employee: mongoose.Types.ObjectId('6288f73964ed6961bb7c2075'),
        project: mongoose.Types.ObjectId('6288f73964ed6961bb7c2076'),
        role: 'qa',
        rate: 10,
        workedHours: 33,
        description: 'Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
        task: mongoose.Types.ObjectId('6288f73964ed6961bb7c2077'),
      },
    );
    expect(response.status).toBe(200);
  });
  test('Edit response should return: The timesheet has not been found', async () => {
    const response = await request(app).put('/timesheets/6288f73964ed6961bb7c2073').send(
      {
        employee: mongoose.Types.ObjectId('6288f73964ed6961bb7c2075'),
        project: mongoose.Types.ObjectId('6288f73964ed6961bb7c2076'),
        role: 'qa',
        rate: 10,
        workedHours: 33,
        description: 'Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
        task: mongoose.Types.ObjectId('6288f73964ed6961bb7c2077'),
      },
    );
    expect(response.body.message).toEqual('The timesheet has not been found');
  });
  test('Wrong endpoint response should return: There was an error', async () => {
    const response = await request(app).put('/timesheets/asd').send(
      {
        employee: mongoose.Types.ObjectId('6288f73964ed6961bb7c2075'),
        project: mongoose.Types.ObjectId('6288f73964ed6961bb7c2076'),
        role: 'qa',
        rate: 10,
        workedHours: 33,
        description: 'Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
        task: mongoose.Types.ObjectId('6288f73964ed6961bb7c2077'),
      },
    );
    expect(response.body.message).toEqual('There was an error');
  });
  test('Edit response should return error validation', async () => {
    const response = await request(app).put('/timesheets/6285b864f52d378096258169').send(
      {
        employee: mongoose.Types.ObjectId('6288f73964ed6961bb7c2075'),
        project: mongoose.Types.ObjectId('6288f73964ed6961bb7c2076'),
        role: 1234,
        rate: 10,
        workedHours: 33,
        description: 'Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
        task: mongoose.Types.ObjectId('6288f73964ed6961bb7c2077'),
      },
    );
    expect(response.error).toBeTruthy();
  });
});

describe('DELETE timesheet', () => {
  test('Response should return a status 200', async () => {
    const response = await request(app).delete('/timesheets/6285b864f52d378096258169').send();
    expect(response.status).toBe(200);
  });
  test('Response should return a status 400', async () => {
    const response = await request(app).delete('/timesheets/wrong-endpoint').send();
    expect(response.status).toBe(400);
  });
  test('Response should return a not found message', async () => {
    const response = await request(app).delete('/timesheets/6285b864f52d378096258169').send();
    expect(response.body.message).toEqual('The timesheet has not been found');
  });
});
