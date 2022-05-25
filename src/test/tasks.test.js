import request from 'supertest';
import mongoose from 'mongoose';
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

describe('/GET /tasks', () => {
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

describe('/GET /tasks/:id', () => {
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

describe('/POST /tasks', () => {
  const testTask = {
    employeeId: mongoose.Types.ObjectId('628cdc224fc0ef4f8c43b1b1'),
    projectId: mongoose.Types.ObjectId('62891944b389642a7f13ca51'),
    title: 'Task 6 Cami',
    description: 'This is the task 6',
    date: 2020 - 12 - 11,
    done: true,
  };
  test('Should create a task', async () => {
    const response = await request(app).post('/tasks').send(testTask);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
  });
  test('Message should indicate the creation of task', async () => {
    const response = await request(app).post('/tasks').send(testTask);
    expect(response.body.message).toEqual('Task Added');
  });
  test('Verify that task has been created with same data that was submitted', async () => {
    const response = await request(app).post('/tasks').send(testTask);
    expect(response.body.data.employeeId).toEqual('628cdc224fc0ef4f8c43b1b1');
    expect(response.body.data.projectId).toEqual('62891944b389642a7f13ca51');
    expect(response.body.data.title).toEqual('Task 6 Cami');
    expect(response.body.data.description).toEqual('This is the task 6');
    expect(response.body.data.date).not.toBeNull();
    expect(response.body.data.done).toBeTruthy();
  });
  test('Response should return a 400 status if the required fields are incorrect', async () => {
    delete testTask.title;
    const response = await request(app).post('/tasks').send(testTask);
    expect(response.status).toBe(400);
  });
  test('Message should indicate the error in data', async () => {
    const response = await request(app).post('/tasks').send(testTask);
    expect(response.body.message).toEqual('"title" is required');
  });
  test('Response should return validation error joi', async () => {
    const response = await request(app).post('/tasks').send({
      employeeId: mongoose.Types.ObjectId('628cdc224fc0ef4f8c43b1b1'),
      projectId: mongoose.Types.ObjectId('62891944b389642a7f13ca51'),
      title: 356426,
      description: 'This is the task 6',
      date: 2020 - 12 - 11,
      done: true,
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual('"title" must be a string');
  });
});

describe('/PUT /tasks/:id', () => {
  const idTest = '6288fa66a52cdee44fee0144';
  const testUpdateTask = {
    title: 'Task 6 Lucas',
    description: 'This is the task 6.5',
    done: false,
  };
  test('Should update a task', async () => {
    const response = await request(app).put(`/tasks/${idTest}`).send(testUpdateTask);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
  test('Message should indicate that task has been updated', async () => {
    const response = await request(app).put(`/tasks/${idTest}`).send(testUpdateTask);
    expect(response.body.message).toEqual('Task Modified');
  });
  test('Verify that task has been updated with same data that was submitted', async () => {
    const response = await request(app).put(`/tasks/${idTest}`).send(testUpdateTask);
    expect(response.body.data.title).toEqual('Task 6 Lucas');
    expect(response.body.data.description).toEqual('This is the task 6.5');
    expect(response.body.data.done).not.toBeTruthy();
  });
  test('If ID is invalid then response should return a 400 status and a correct unsuccessful msg', async () => {
    const response = await request(app).put('/tasks/6288fa66a52cdee44fee0244').send();
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Id: 6288fa66a52cdee44fee0244 doesn't exist.");
  });
  test('If ID format is invalid then response should return a 500 status', async () => {
    const response = await request(app).put('/tasks/6288').send();
    expect(response.status).toBe(500);
  });
  test('Response should return validation error joi', async () => {
    const response = await request(app).put(`/tasks/${idTest}`).send({
      title: 356426,
      description: 'This is the task 6.5',
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual('"title" must be a string');
  });
});

describe('/DELETE /tasks/:id', () => {
  const idTest = '6288fa66a52cdee44fee0144';
  test('Response should return a status 200', async () => {
    const response = await request(app).delete(`/tasks/${idTest}`).send();
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Task Deleted');
  });
  test('If ID is invalid then response should return a 404 status and a correct unsuccessful msg', async () => {
    const response = await request(app).delete('/tasks/6288fa66a52cdee44fee0244').send();
    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Task with id: 6288fa66a52cdee44fee0244 not found');
  });
  test('If ID format is invalid then response should return a 400 status', async () => {
    const response = await request(app).delete('/tasks/6288').send();
    expect(response.status).toBe(400);
  });
});
