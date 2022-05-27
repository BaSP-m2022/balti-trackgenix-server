import mongoose from 'mongoose';
import request from 'supertest';
import app from '../index';
import Projects from '../models/Projects';
import projectsSeed from '../seed/projects';
import Employees from '../models/Employees';
import employeesSeed from '../seed/employees';
import Admins from '../models/Admins';
import adminsSeed from '../seed/admins';

const projectID = '62891944b389642a7f13ca53';
const wrongPath = '62891944b389642a';
const wrongID = '628cf237305204bf7d672d7c';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
  await Employees.collection.insertMany(employeesSeed);
  await Admins.collection.insertMany(adminsSeed);
});

describe('/GET /projects/:id', () => {
  test('Response should return one project', async () => {
    const response = await request(app).get(`/projects/${projectID}`).send();
    expect(response.body.msg).toEqual('Successful search!');
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    // eslint-disable-next-line no-underscore-dangle
    expect(response.body.data._id).toEqual(projectID);
  });
  test('Wrong path data, should return error', async () => {
    const response = await request(app).get(`/projects/${wrongPath}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.msg).toEqual('There was an error');
  });
});

describe('/PUT /projects', () => {
  test('Project updated', async () => {
    const response = await request(app).put(`/projects/${projectID}`).send({
      projectName: 'Fourth Project',
      description: 'Description of project',
      isActive: true,
    });
    expect(response.body.msg).toEqual(`Project with id ${projectID} has been successfully updated!`);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data.projectName).toEqual('Fourth Project');
    expect(response.body.data.description).toEqual('Description of project');
    expect(response.body.data.isActive).toEqual(true);
  });
  test('Input not match joi validations, should return error', async () => {
    const response = await request(app).put(`/projects/${projectID}`).send({
      projectName: '123',
      description: 'asd',
      isActive: 123456,
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.msg).toEqual('Error during data validation!');
  });
  test('Wrong input data should return error', async () => {
    const response = await request(app).put(`/projects/${wrongPath}`).send({
      projectName: 'Fourth Project',
      description: 'Description of project',
      isActive: false,
      admin: mongoose.Types.ObjectId('628cf22111b8397990200a06'),
      client: 'Nicolas Costanza',
      startDate: 2015 - 25 - 10,
      endDate: 2021 - 25 - 10,
      employees: [
        {
          employeeId: mongoose.Types.ObjectId('628cf152c7dfd0c4fe2edb9e'),
          role: 'TL',
          rate: 5000,
          hoursInProject: 700,
        },
      ],
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.msg).toEqual('There was an error');
  });
  test('Wrong ID, should return not found', async () => {
    const response = await request(app).put(`/projects/${wrongID}`).send({
      projectName: 'Fourth Project',
      description: 'Description of project',
      isActive: false,
      admin: mongoose.Types.ObjectId('628cf22111b8397990200a06'),
      client: 'Nicolas Costanza',
      startDate: 2015 - 25 - 10,
      endDate: 2021 - 25 - 10,
      employees: [
        {
          employeeId: mongoose.Types.ObjectId('628cf152c7dfd0c4fe2edb9e'),
          role: 'TL',
          rate: 5000,
          hoursInProject: 700,
        },
      ],
    });
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.msg).toEqual(`Project not found for id: ${wrongID}`);
  });
});

describe('/DELETE /projects', () => {
  test('Project deleted', async () => {
    const response = await request(app).delete(`/projects/${projectID}`);
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.msg).toEqual('Project deleted.');
  });
  test('Wrong path data, should return error', async () => {
    const response = await request(app).delete(`/projects/${wrongPath}`);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.msg).toEqual('There was an error');
  });
  test('Wrong ID, should return not found', async () => {
    const response = await request(app).delete(`/projects/${wrongID}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.msg).toEqual('Project not found.');
  });
});
