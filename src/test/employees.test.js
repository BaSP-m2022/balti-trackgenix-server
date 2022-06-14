/* eslint-disable no-useless-escape */
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../index';
import Employees from '../models/Employees';
import Projects from '../models/Projects';
import employeesSeed from '../seed/employees';
import projectsSeed from '../seed/projects';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
  await Projects.collection.insertMany(projectsSeed);
});

describe('/GET /employees', () => {
  test('return status 200 get all employees', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual('All Employees collected');
  });
  test('Check that it is not null', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('/POST /employees', () => {
  test('I verify that the employee has been created with the data sent through the body', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Federico',
      lastName: 'Troanes',
      email: 'fedetroanes@gmail.com',
      password: 'fedekun23w3',
      assignedProjects: [mongoose.Types.ObjectId('628cf237305204bf7d672d7b')],
      isActive: true,
    });
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual('New Employee created');
    expect(response.body.data.firstName).toEqual('Federico');
    expect(response.body.data.lastName).toEqual('Troanes');
    expect(response.body.data.email).toEqual('fedetroanes@gmail.com');
    expect(response.body.data.password).toEqual('fedekun23w3');
    expect(response.body.data.assignedProjects).toEqual(['628cf237305204bf7d672d7b']);
    expect(response.body.data.isActive).toBeTruthy();
  });
  test('It should return error by not passing body', async () => {
    const response = await request(app).post('/employees').send();
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('\"firstName\" is required');
    expect(response.body.error).toBeTruthy();
  });
  test('Should return validation error joi', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 123,
      lastName: 213,
      email: 'fedetroanes@gmail.com',
      password: 'fedekun23w3',
      assignedProjects: [mongoose.Types.ObjectId('6287f93beee9276577d60c1f')],
      isActive: true,
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual('\"firstName\" must be a string');
  });
});
describe('GET /employees/:id', () => {
  test('Valid employee ID should return status 200.', async () => {
    const response = await request(app).get('/employees/62891944b389642a7f13ca53').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('ID not founded should return status 404.', async () => {
    const response = await request(app).get('/employees/6288f73964ed6961bb7c2032').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Invalid ID should return status 400.', async () => {
    const response = await request(app).get('/employees/a22').send();
    expect(response.status).toBe(400);
    expect(response.error).not.toBeFalsy();
  });
});

describe('PUT /employees/:id', () => {
  test('Edit employee with all the parameters correct should return status 200.', async () => {
    const response = await request(app).put('/employees/62891944b389642a7f13ca53').send({
      firstName: 'Msssati',
      lastName: 'Weber',
      email: 'Max@gmail.com',
      password: 'Max123456',
      isActive: true,
    });
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.data.firstName).toEqual('Msssati');
    expect(response.body.data.lastName).toEqual('Weber');
    expect(response.body.data.email).toEqual('Max@gmail.com');
    expect(response.body.data.password).toEqual('Max123456');
    expect(response.body.data.isActive).toBe(true);
  });

  test('Edit employee with an incorrect parameter should return status 400.', async () => {
    const response = await request(app).put('/employees/62891944b389642a7f13ca53').send({
      firstName: 'Msssati',
      lastName: 'Fe',
      email: 'Max@gmail.com',
      password: 'Max123456',
      isActive: true,
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('\"lastName\" length must be at least 3 characters long');
  });
  test('Edit employee with an incorrect ID should return status 404.', async () => {
    const response = await request(app).put('/employees/6287c08beee9276577d53b2f').send({
      firstName: 'Msssati',
      lastName: 'Weber',
      email: 'Max@gmail.com',
      password: 'Max123456',
      isActive: true,
    });
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('DEL /employees/:id', () => {
  test('Delete invalid employee ID should return status 400.', async () => {
    const response = await request(app).delete('/employees/6288f73964ed6961bb7c275').send();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('Delete invalid employee ID should return error message.', async () => {
    const response = await request(app).delete('/employees/6288f73964ed6961bb7c275').send();
    expect(response.body.message).toEqual('There was an error');
  });

  test('Delete incorrect employee ID should return status 404.', async () => {
    const response = await request(app).delete('/employees/6288f73964ed6961bb7c2175').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });

  test('Delete correct employee ID should return status 200.', async () => {
    const response = await request(app).delete('/employees/62891944b389642a7f13ca53').send();
    expect(response.status).toBe(200);
    expect(response.error).toBe(false);
  });
  test('Delete correct employee ID should return success message.', async () => {
    const response = await request(app).delete('/employees/628cf152c7dfd0c4fe2edb9e').send();
    expect(response.body.message).toEqual('Employee id: 628cf152c7dfd0c4fe2edb9e deleted.');
  });
});
