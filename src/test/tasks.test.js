import request from 'supertest';
import app from '../index';
import Tasks from '../models/Tasks';
import Projects from '../models/Projects';
import Employees from '../models/Employees';
import tasksSeed from '../seed/tasks';
import projectSeed from '../seed/projects';
import employeeSeed from '../seed/employees';

beforeAll(async () => {
  await Tasks.collection.insertMany(tasksSeed);
  await Projects.collection.insertMany(projectSeed);
  await Employees.collection.insertMany(employeeSeed);
});

describe('GET all tasks', () => {
  test('Return a 200 status if the get method worked ok', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.status).toBe(200);
  });
  test('Response should return false error', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.error).toBeFalsy();
  });
  test('Response should return a correct successful message', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.body.message).toEqual('Request Successful. All tasks.');
  });
  test('Response should return at least one task', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('GET task by id', () => {
  const idTest = '6288fa66a52cdee44fee0144';
  test('Return a 200 status if the getById method worked ok', async () => {
    const response = await request(app).get(`/tasks/${idTest}`).send();
    expect(response.status).toBe(200);
  });
  test('Response should return false error', async () => {
    const response = await request(app).get(`/tasks/${idTest}`).send();
    expect(response.error).toBeFalsy();
  });
  test('Response should return a correct successful message', async () => {
    const response = await request(app).get(`/tasks/${idTest}`).send();
    expect(response.body.message).toEqual(`Request Successful. Task with Id: ${idTest} found.`);
  });
  test('Response should return only one task', async () => {
    const response = await request(app).get(`/tasks/${idTest}`).send();
    expect([response.body.data]).toHaveLength(1);
  });
  test('If ID is invalid then response should return a 404 status and a correct unsuccessful msg', async () => {
    const response = await request(app).get('/tasks/6288fa66a52cdee44fee0244').send();
    expect(response.status).toBe(404);
    expect(response.body.message).toEqual("Id: 6288fa66a52cdee44fee0244 doesn't exist.");
  });
  test('If ID format is invalid then response should return a 500 status', async () => {
    const response = await request(app).get('/tasks/6288').send();
    expect(response.status).toBe(500);
  });
});
