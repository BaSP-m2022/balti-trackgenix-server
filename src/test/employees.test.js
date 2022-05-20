import request from 'supertest';
import app from '../index';
import Admins from '../models/Admins';
import employeesSeed from '../seed/employees';

beforeAll(async () => {
  await Admins.collection.insertMany(employeesSeed);
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
      firstName: 'Camila',
      lastName: 'figueroa',
      email: 'sadcamil@gmail.com',
      password: 'h231jdda4',
      assignedProjects: ['2134b7f40b47573aa06aef3', '6223b7f40b4357e81sa06ef3', '1223b234a4357e81sa06ef3'],
      isActive: true,
    });
    expect(response.status).toBe(200);
  });
});
