import request from 'supertest';
import app from '../index';
import superAdmins from '../models/Super-admins';
import superAdminsSeed from '../seed/super-admins';

beforeAll(async () => {
  await superAdmins.collection.insertMany(superAdminsSeed);
});

let superAdminId;

describe('GET /superAdmins', () => {
  test('response should return a 200 status, false error and data', async () => {
    const response = await request(app).get('/super-admin').send();
    expect(response.status).toBe(200);
    expect(response.error).not.toBeTruthy();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('POST /superAdmins', () => {
  test('should create an super admin, status 201, successful message and false error', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'Vladimir',
      lastName: 'Putin',
      email: 'putinvlad@proton.com',
      password: 'ZnKGy7jDOiQ',
      isActive: true,
    });
    expect(response.status).toBe(201);
    expect(response.body.msg).toEqual('Request Successful');
    expect(response.error).not.toBeTruthy();
    superAdminId = response.body.data._id;
  });

  test('should not create the super admin', async () => {
    const response = await request(app).post('/super-admin').send();
    expect(response.status).toBe(400);
  });

  test('should give error firstname required', async () => {
    const response = await request(app).post('/super-admin').send();
    expect(response.status).toBe(400);
    expect(response.body.msg).toEqual('"firstName\" is required');
    expect(response.error).toBeTruthy();
  });

  test('should give lastname required', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'Vladimir',
      email: 'putinvlad@proton.com',
      password: 'ZnKGy7jDOiQ',
      isActive: true,
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toEqual('\"lastName\" is required');
    expect(response.error).toBeTruthy();
  });

  test('should give firstname length <= to 30 characters', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'PastelDePapaPastelllDePapaaaaaaaa',
      lastName: 'Putin',
      email: 'putinvlad@proton.com',
      password: 'ZnKGy7jDOiQ',
      isActive: true,
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toEqual('\"firstName\" length must be less than or equal to 30 characters long');
    expect(response.error).toBeTruthy();
  });

  test('should give firstname length at least 3 characters', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'a',
      lastName: 'Putin',
      email: 'putinvlad@proton.com',
      password: 'ZnKGy7jDOiQ',
      isActive: true,
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toEqual('\"firstName\" length must be at least 3 characters long');
    expect(response.error).toBeTruthy();
  });
});

// describe('DELETE /superAdmins/:id', () => {
//   test('response should return a 200 status', async () => {
//     const response = await request(app).delete(`/super-admin/${superAdminId}`).send();
//     expect(response.status).toEqual(200);
//   });
// });
