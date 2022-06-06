import request from 'supertest';
import app from '../index';
import Admins from '../models/Admins';
import adminsSeed from '../seed/admins';

const adminId = '628cf22111b8397990200a06';
const wrongID = '628cf218c545127e724c882f';

beforeAll(async () => {
  await Admins.collection.insertMany(adminsSeed);
});

describe('/GET /admins', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });

  test('response should return one admin', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('response should return an admin with the requested ID', async () => {
    const response = await request(app).get(`/admins/${adminId}`).send();
    expect(response.body.message).toBe('Admin 628cf22111b8397990200a06 found');
  });
});

describe('/POST /admins', () => {
  test('response should create an admin', async () => {
    const response = await request(app).post('/admins').send({
      firstName: 'Regina',
      lastName: 'Phalange',
      email: 'rphalange@friends.com',
      password: '0024121889',
      isActive: true,
    });
    expect(response.status).toBe(201);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toEqual('Admin created successfully');
    expect(response.body.data.firstName).toEqual('Regina');
    expect(response.body.data.lastName).toEqual('Phalange');
    expect(response.body.data.email).toEqual('rphalange@friends.com');
    expect(response.body.data.password).toEqual('0024121889');
    expect(response.body.data.isActive).toEqual(true);
  });
});

describe('/PUT /admins', () => {
  test('Admin updated successfully, response should return status 200', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Phoebe',
    });
    expect(response.status).toBe(200);
  });

  test('Admin updated unsuccessfully, response should return status 400', async () => {
    const response = await request(app).put('/admins/628c2d1c83caa8c89645').send({
      firstName: 'Phoebe',
      lastName: 'Bananahammock',
      email: 'pbuffay@gmail.com',
      password: '1211115675',
      isActive: true,
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('There was an error');
  });
});

describe('/DELETE /admins', () => {
  test('Delete admin should return status 200', async () => {
    const response = await request(app).delete(`/admins/${adminId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual(`Admin ${adminId} deleted successfully`);
  });

  test('Delete invalid Admin ID, should return Admin not found', async () => {
    const response = await request(app).delete(`/admins/${wrongID}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toEqual(`Admin ${wrongID} not found`);
  });
});
