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
    expect(response.body.message).toEqual('Request Successful');
    expect(response.error).toBeFalsy();
  });
});

describe('POST /superAdmins', () => {
  test('should create an super admin, status 201, successful message and false error', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'Vladimir',
      lastName: 'Putin',
      email: 'putinvlad@proton.com',
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toEqual('New Super Admin created');
    expect(response.error).toBeFalsy();
    expect(response.body.data.firstName).toEqual('Vladimir');
    expect(response.body.data.lastName).toEqual('Putin');
    expect(response.body.data.email).toEqual('putinvlad@proton.com');
    superAdminId = response.body.data._id;
  });

  test('should not create the super admin', async () => {
    const response = await request(app).post('/super-admin').send();
    expect(response.status).toBe(400);
  });

  test('should give error firstname required', async () => {
    const response = await request(app).post('/super-admin').send();
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('"firstName" is required');
    expect(response.error).toBeTruthy();
  });

  test('should give lastname required', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'Vladimir',
      email: 'putinvlad@proton.com',
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('"lastName" is required');
    expect(response.error).toBeTruthy();
  });

  test('should give firstname length <= to 30 characters', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'PastelDePapaPastelllDePapaaaaaaaa',
      lastName: 'Putin',
      email: 'putinvlad@proton.com',
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('"firstName" length must be less than or equal to 30 characters long');
    expect(response.error).toBeTruthy();
  });

  test('should give firstname length at least 3 characters', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'a',
      lastName: 'Putin',
      email: 'putinvlad@proton.com',
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('"firstName" length must be at least 3 characters long');
    expect(response.error).toBeTruthy();
  });
});

describe('GET /superAdmins/:id', () => {
  test('should get a super admin', async () => {
    const response = await request(app).get(`/super-admin/${superAdminId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Request Successful');
    expect(response.error).toBeFalsy();
    expect(response.body.data._id).toEqual(superAdminId);
    expect(response.body.data.firstName).toEqual('Vladimir');
    expect(response.body.data.lastName).toEqual('Putin');
    expect(response.body.data.email).toEqual('putinvlad@proton.com');
  });

  test('should not get a super admin, super admin does not exist', async () => {
    const response = await request(app).get('/super-admin/628c11cd336973066ff800cb').send();
    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('The Super Admin has not been found');
    expect(response.error).toBeTruthy();
  });

  test('should not get a super admin,  invalid ID', async () => {
    const response = await request(app).get('/super-admin/628c11cd336973066ff80cb').send();
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('There was an error');
    expect(response.error).toBeTruthy();
  });
});

describe('PUT /superAdmins', () => {
  test('should update an super admin', async () => {
    const response = await request(app).put(`/super-admin/${superAdminId}`).send({
      firstName: 'Valdemir',
      lastName: 'Rasputin',
      email: 'rasputinvlad@proton.com',
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Super Admin  updated');
    expect(response.error).toBeFalsy();
    expect(response.body.data.firstName).toEqual('Valdemir');
    expect(response.body.data.lastName).toEqual('Rasputin');
    expect(response.body.data.email).toEqual('rasputinvlad@proton.com');
  });

  test('should update an super admin firstname', async () => {
    const response = await request(app).put(`/super-admin/${superAdminId}`).send({
      firstName: 'segundo testeo',
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Super Admin  updated');
    expect(response.error).toBeFalsy();
    expect(response.body.data.firstName).toEqual('segundo testeo');
  });

  test('should update an super admin lastname', async () => {
    const response = await request(app).put(`/super-admin/${superAdminId}`).send({
      lastName: 'apellido nuevo',
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Super Admin  updated');
    expect(response.error).toBeFalsy();
    expect(response.body.data.lastName).toEqual('apellido nuevo');
  });

  test('should not update an super admin, it does not exist', async () => {
    const response = await request(app).put('/super-admin/628c0100b72cc96d487c853b').send({
      firstName: 'Valdemir',
      lastName: 'Rasputin',
      email: 'rasputinvlad@proton.com',
    });
    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('The Super Admin has not been found');
    expect(response.error).toBeTruthy();
  });

  test('should not update an super admin, empty request', async () => {
    const response = await request(app).put('/super-admin').send();
    expect(response.status).toBe(404);
    expect(response.body.message).toEqual(undefined);
    expect(response.error).toBeTruthy();
  });

  test('should update an super admin firstname?', async () => {
    const response = await request(app).put(`/super-admin/${superAdminId}`).send({
      firstName: '78948564968',
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Super Admin  updated');
    expect(response.error).toBeFalsy();
  });
});

describe('DELETE /superAdmins/:id', () => {
  test('response should return a 400 status, id wrongly typed', async () => {
    const response = await request(app).delete('/super-admin/628c11cd336973066ff80cb').send();
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('There was an error');
    expect(response.error).toBeTruthy();
  });

  test('response should return a 404 status, id does not exist', async () => {
    const response = await request(app).delete('/super-admin/628c11cd336973066ff800cb').send();
    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual('The Super Admin has not been found');
    expect(response.error).toBeTruthy();
  });

  test('response should return a 200 status', async () => {
    const response = await request(app).delete(`/super-admin/${superAdminId}`).send();
    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('Super Admin  deleted');
    expect(response.error).toBeFalsy();
  });
});
