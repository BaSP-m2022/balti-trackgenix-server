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
