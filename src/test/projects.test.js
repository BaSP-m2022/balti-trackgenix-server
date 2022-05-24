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
    expect(response.body.error).toBe(false);
    expect(response.body.msg).toEqual('All the projects found');
  });

  test('Check that it is not null', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('/POST /projects', () => {
  test('Should create an project successfully', async () => {
    const response = await request(app).post('/projects').send({
      projectName: 'Second Project',
      description: 'Description of project',
      isActive: true,
      admin: '6287b9da26cff823b1f9055b',
      client: 'Fernando Morelli',
      startDate: 2015 - 25 - 10,
      endDate: 2015 - 25 - 10,
      employees: [
        {
          employeeId: '6287e6f01c1709ee93503342',
          role: 'QA',
          rate: 3000,
          hoursInProject: 700,
        },
      ],
    });
    expect(response.status).toBe(201);
    expect(response.body.error).toBe(false);
    expect(response.body.msg).toEqual('New Project successfully created');
  });

  test('Check that it is not null or with an error', async () => {
    const response = await request(app).post('/projects').send();
    expect(response.status).toBe(400);
    expect(response.body.msg).toEqual('Error during validation, check all the parameters');
    expect(response.body.error).toBe(true);
  });

  test('With an correct user the response should return a not undefined data', async () => {
    const response = await request(app).post('/projects').send({
      projectName: 'Second Project',
      description: 'Description of project',
      isActive: true,
      admin: '6287b9da26cff823b1f9055b',
      client: 'Fernando Morelli',
      startDate: 2015 - 25 - 10,
      endDate: 2021 - 25 - 10,
      employees: [
        {
          employeeId: '6287e6f01c1709ee93503342',
          role: 'QA',
          rate: 3000,
          hoursInProject: 700,
        },
      ],
    });
    expect(response.body.data).not.toBeUndefined();
  });

  test('Should return error with joi validation', async () => {
    const response = await request(app).post('/projects').send({
      projectName: 'Second Project of lalalalalalalalala',
      description: 'Description of project',
      isActive: null,
      admin: '6287b9da26cff823b1f9055b',
      client: 'Fernando Morelli',
      startDate: 2015 - 25 - 10,
      endDate: 2021 - 25 - 10,
      employees: [
        {
          employeeId: '6287e6f01c1709ee93503342',
          role: 'QA',
          rate: 3000,
          hoursInProject: 700,
        },
      ],
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toEqual('Error during validation, check all the parameters');
    expect(response.body.error).toBe(true);
  });
});
