import request from 'supertest';
import app from '../index';
import projectModel from '../models/Projects';
import projectSeed from '../seed/projects';

beforeAll(async () => {
  await projectModel.collection.insertMany(projectSeed);
});

describe('/GetAll /projects', () => {
  test('Response should return a status 200', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
  });

  test('Response should return a false error', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.error).toBe(false);
  });

  test('Response should return a msg: All the projects found', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.msg).toEqual('All the projects found');
  });

  test('Check that it is not null', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
