import request from 'supertest';
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

describe('/GET /timesheets/:id', () => {
  test('Response should return a status 200', async () => {
    const response = await request(app).get('/timesheets/6285b864f52d378096258169').send();
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
