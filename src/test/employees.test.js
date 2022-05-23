import request from 'supertest';
import app from '../index';
import Employees from '../models/Employees';
import employeesSeed from '../seed/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});

describe('/GET /employees', () => {
  test('return status 200 get all employees', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.status).toBe(200);
  });
});

describe('/POST /employees', () => {
  test('should create an employee', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Federico',
      lastName: 'Troanes',
      email: 'fedetroanes@gmail.com',
      password: 'fedekun23w3',
      assignedProjects: ['6287f93beee9276577d60c1f'],
      isActive: true,
    });
    expect(response.status).toBe(201);
  });
});
