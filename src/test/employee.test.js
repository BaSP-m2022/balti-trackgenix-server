// import mongoose from 'mongoose';
import request from 'supertest';
import app from '../index';
import Employees from '../models/Employees';
import employeeSeed from '../seed/employees';
import Projects from '../models/Projects';
import projectSeed from '../seed/projects';

beforeAll(async () => {
  await Employees.collection.insertMany(employeeSeed);
  await Projects.collection.insertMany(projectSeed);
});

// get one employee tests
describe('GET /employees', () => {
  test('Valid employee ID should return status 200.', async () => {
    const response = await request(app).get('/employees/62891944b389642a7f13ca53').send();
    expect(response.status).toBe(200);
  });
  test('Valid employee ID should return error:false.', async () => {
    const response = await request(app).get('/employees/62891944b389642a7f13ca53').send();
    expect(response.error).toBeFalsy();
  });
  test('ID not founded should return status 404.', async () => {
    const response = await request(app).get('/employees/6288f73964ed6961bb7c2032').send();
    expect(response.status).toBe(404);
  });
  test('ID not founded should return error:true.', async () => {
    const response = await request(app).get('/employees/6288f73964ed6961bb7c2031').send();
    expect(response.error).toBeTruthy();
  });
  test('Invalid ID should return status 400.', async () => {
    const response = await request(app).get('/employees/a22').send();
    expect(response.status).toBe(400);
  });
  test('Invalid ID should not return error:false.', async () => {
    const response = await request(app).get('/employees/a22').send();
    expect(response.error).not.toBeFalsy();
  });
});

// edit employee tests
describe('PUT /employees', () => {
  test('Edit employee with all the parameters correct should return status 200.', async () => {
    const response = await request(app).put('/employees/62891944b389642a7f13ca53').send({
      firstName: 'Msssati',
      lastName: 'Weber',
      email: 'Max@gmail.com',
      password: 'Max123456',
      // assignedProjects: mongoose.Types.ObjectId('628cf237305204bf7d672d7b'),
      isActive: true,
    });
    // console.log(response);
    expect(response.status).toBe(200);
  });
  test('Edit employee with all the parameters correct should return error:false.', async () => {
    const response = await request(app).put('/employees/62891944b389642a7f13ca53').send({
      firstName: 'Msssati',
      lastName: 'Weber',
      email: 'Max@gmail.com',
      password: 'Max123456',
      // assignedProjects: mongoose.Types.ObjectId('628cf237305204bf7d672d7b'),
      isActive: true,
    });
    // console.log(response);
    expect(response.error).toBeFalsy();
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
  });
  test('Edit employee with an incorrect parameter should return error message.', async () => {
    const response = await request(app).put('/employees/628cf152c7dfd0c4fe2edb9e').send({
      firstName: 'Msssati',
      lastName: 'Fee',
      email: 'Max@gmail.com',
      password: 'Max1234',
      isActive: true,
    });
    expect(response.body.message).toBe('Missing data');
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
  });
  test('Edit employee with an incorrect ID should return error:true.', async () => {
    const response = await request(app).put('/employees/6287c08beee9276577d53b2f').send({
      firstName: 'Msssati',
      lastName: 'Weber',
      email: 'Max@gmail.com',
      password: 'Max123456',
      isActive: true,
    });
    expect(response.error).toBeTruthy();
  });
});

// delete employee tests
describe('DEL /employees', () => {
  test('Delete invalid employee ID should return status 400.', async () => {
    const response = await request(app).delete('/employees/6288f73964ed6961bb7c275').send();
    expect(response.status).toBe(400);
  });
  test('Delete invalid employee ID should return error message.', async () => {
    const response = await request(app).delete('/employees/6288f73964ed6961bb7c275').send();
    expect(response.body.message).toEqual('There was an error');
  });
  test('Delete incorrect employee ID should return status 404.', async () => {
    const response = await request(app).delete('/employees/6288f73964ed6961bb7c2175').send();
    expect(response.status).toBe(404);
  });
  test('Delete correct employee ID should return status 200.', async () => {
    const response = await request(app).delete('/employees/62891944b389642a7f13ca53').send();
    expect(response.status).toBe(200);
  });
  test('Delete correct employee ID should return success message.', async () => {
    const response = await request(app).delete('/employees/628cf152c7dfd0c4fe2edb9e').send();
    // console.log(response);
    expect(response.body.message).toEqual('Employee id: 628cf152c7dfd0c4fe2edb9e deleted.');
  });
});
