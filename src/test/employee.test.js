// import mongoose from 'mongoose';
import request from 'supertest';
import app from '../index';
import Employees from '../models/Employees';
import employeeSeed from '../seed/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(employeeSeed);
});
// get one employee tests
describe('GET /employees', () => {
  test('Valid employee ID should return status 200', async () => {
    const response = await request(app).get('/employees/6288f73964ed6961bb7c2075').send();
    expect(response.status).toBe(200);
  });
  test('ID not founded should return status 404', async () => {
    const response = await request(app).get('/employees/6288f73964ed6961bb7c2032').send();
    expect(response.status).toBe(404);
  });
  test('Invalid ID should return status 400', async () => {
    const response = await request(app).get('/employees/a22').send();
    expect(response.status).toBe(400);
  });
});

// // edit employee tests
describe('PUT /employees', () => {
  test('Edit employee with all the parameters correct should return status 200', async () => {
    const response = await request(app).put('/employees/6287c08beee9276577d53b1f').send({
      firstName: 'Msssati',
      lastName: 'Weber',
      email: 'Max@gmail.com',
      password: 'Max123456',
      isActive: true,
    });
    expect(response.status).toBe(200);
  });
  test('Edit employee with an incorrect parameter should return status 400', async () => {
    const response = await request(app).put('/employees/6287c08beee9276577d53b1f').send({
      firstName: 'Msssati',
      lastName: 'Fe',
      email: 'Max@gmail.com',
      password: 'Max123456',
      isActive: true,
    });
    expect(response.status).toBe(400);
  });
  test('Edit employee with an incorrect ID should return status 404', async () => {
    const response = await request(app).put('/employees/6287c08beee9276577d53b2f').send({
      firstName: 'Msssati',
      lastName: 'Weber',
      email: 'Max@gmail.com',
      password: 'Max123456',
      isActive: true,
    });
    expect(response.status).toBe(404);
  });
});

// delete employee tests
describe('DEL /employees', () => {
  test('Delete invalid employee ID should return status 400', async () => {
    const response = await request(app).delete('/employees/6288f73964ed6961bb7c275').send();
    expect(response.status).toBe(400);
  });
  test('Delete incorrect employee ID should return status 404', async () => {
    const response = await request(app).delete('/employees/6288f73964ed6961bb7c2175').send();
    expect(response.status).toBe(404);
  });
  test('Delete correct employee ID should return status 200', async () => {
    const response = await request(app).delete('/employees/6288f73964ed6961bb7c2075').send();
    expect(response.status).toBe(200);
  });
});
