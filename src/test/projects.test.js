import mongoose from 'mongoose';
import request from 'supertest';
import app from '../index';
import projectModel from '../models/Projects';
import projectSeed from '../seed/projects';

beforeAll(async () => {
  await projectModel.collection.insertMany(projectSeed);
});

describe('/GET /projects', () => {
  test('Response should return a status 200', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.msg).toEqual('All the projects found');
  });

  test('Check that it is not null', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('/POST /projects', () => {
  test('Should create a project successfully', async () => {
    const response = await request(app).post('/projects').send({
      projectName: 'First Project',
      description: 'Description of project',
      isActive: true,
      admin: mongoose.Types.ObjectId('6287b91426cff823b1f9055a'),
      client: 'Camila Figueroa',
      startDate: 2010 - 13 - 12,
      endDate: 2020 - 13 - 12,
      employees: [
        {
          employeeId: mongoose.Types.ObjectId('62891944b389642a7f13ca53'),
          role: 'DEV',
          rate: 2000,
          hoursInProject: 500,
        },
      ],
    });
    expect(response.status).toBe(201);
    expect(response.body.error).toBe(false);
    expect(response.body.msg).toEqual('New Project successfully created');
  });

  test('Check that have an error', async () => {
    const response = await request(app).post('/projects').send();
    expect(response.status).toBe(400);
    expect(response.body.msg).toEqual('Error during validation, check all the parameters');
    expect(response.body.error).toBe(true);
  });

  test('I verify that the employee has been created with the data sent through the body', async () => {
    const response = await request(app).post('/projects').send({
      projectName: 'First Project',
      description: 'Description of project',
      isActive: true,
      admin: mongoose.Types.ObjectId('6287b91426cff823b1f9055a'),
      client: 'Camila Figueroa',
      startDate: '2022-02-02',
      endDate: '2022-02-02T03:00:00.000+00:00',
      employees: [
        {
          employeeId: mongoose.Types.ObjectId('62891944b389642a7f13ca53'),
          role: 'DEV',
          rate: 2000,
          hoursInProject: 500,
        },
      ],
    });
    expect(response.body.data.projectName).toEqual('First Project');
    expect(response.body.data.description).toEqual('Description of project');
    expect(response.body.data.isActive).toBe(true);
    expect(response.body.data.admin).toEqual('6287b91426cff823b1f9055a');
    expect(response.body.data.client).toEqual('Camila Figueroa');
    expect(response.body.data.startDate).not.toBeUndefined();
    expect(response.body.data.endDate).not.toBeUndefined();
    expect(response.body.data.employees[0].employeeId).toEqual('62891944b389642a7f13ca53');
    expect(response.body.data.employees[0].role).toEqual('DEV');
    expect(response.body.data.employees[0].rate).toEqual(2000);
    expect(response.body.data.employees[0].hoursInProject).toEqual(500);
  });

  test('Should return error with joi validation', async () => {
    const response = await request(app).post('/projects').send({
      projectName: 'First Project lalalalalalalalalalalalala',
      description: 'Description of project',
      isActive: null,
      admin: mongoose.Types.ObjectId('6287b91426cff823b1f9055a'),
      client: 'Camila Figueroa',
      startDate: 2010 - 13 - 12,
      endDate: 2020 - 13 - 12,
      employees: [
        {
          employeeId: mongoose.Types.ObjectId('62891944b389642a7f13ca53'),
          role: 'DEV',
          rate: 2000,
          hoursInProject: 500,
        },
      ],
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toEqual('Error during validation, check all the parameters');
    expect(response.body.error).toBe(true);
  });
});
