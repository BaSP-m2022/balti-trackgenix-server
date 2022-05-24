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
  test('Return status 200 get all employees', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual('All Employees collected');
  });
  test('Check that it is not null', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('check that each field is not empty', async () => {
    const response = await request(app).get('/employees').send();
    const allEmployees = Object.values(response.body.data);
    for (let i = 0; i < allEmployees.length; i += 1) {
      const valuesFields = Object.values(allEmployees[i]);
      for (let j = 0; j < valuesFields.length; j += 1) {
        expect(valuesFields[j]).not.toBe(null);
      }
    }
  });
});

describe('/POST /employees', () => {
  test('Should create an employee', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Federico',
      lastName: 'Troanes',
      email: 'fedetroanes@gmail.com',
      password: 'fedekun23w3',
      assignedProjects: mongoose.Types.ObjectId['6287f93beee9276577d60c1f'],
      isActive: true,
    });
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual('New Employee created');
  });
  test('It should return error by not passing body', async () => {
    const response = await request(app).post('/employees').send();
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Missing data');
    expect(response.body.error).toBeTruthy();
  });
  test('Should return validation error joi', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 123,
      lastName: 213,
      email: 'fedetroanes@gmail.com',
      password: 'fedekun23w3',
      assignedProjects: mongoose.Types.ObjectId['6287f93beee9276577d60c1f'],
      isActive: true,
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toEqual('Missing data');
  });
});