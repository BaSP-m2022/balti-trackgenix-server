import request from 'supertest';
import app from '../index';
import Projects from '../models/Projects';
import projectsSeed from '../seed/projects';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
});

describe('/GET /projects', () => {
  test('Response should return one project', async () => {
    const response = await request(app).get('/projects/62891944b389642a7f13ca58').send();
    expect(response.body.data.length).not.toBe(null);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
  test('Wrong path data, should return error', async () => {
    const response = await request(app).get('/projects/62891944b389642a').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.msg).toEqual('There was an error');
  });
  test('Project updated', async () => {
    const response = await request(app).put('/projects/62891944b389642a7f13ca58').send({
      projectName: 'Fourth Project',
      description: 'Description of project',
      isActive: false,
      admin: '6287b9da26cff823b1f9055b',
      client: 'Nicolas Costanza',
      startDate: 2015 - 25 - 10,
      endDate: 2021 - 25 - 10,
      employees: [
        {
          employeeId: '6287e6f01c1709ee93503342',
          role: 'TL',
          rate: 5000,
          hoursInProject: 700,
        },
      ],
    });
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
  test('Wrong id data, should return not found', async () => {
    const response = await request(app).put('/projects/62891944b389').send({
      projectName: 'Fourth Project',
      description: 'Description of project',
      isActive: false,
      admin: '6287b9da26cff823b1f9055b',
      client: 'Nicolas Costanza',
      startDate: 2015 - 25 - 10,
      endDate: 2021 - 25 - 10,
      employees: [
        {
          employeeId: '6287e6f01c1709ee93503342',
          role: 'TL',
          rate: 5000,
          hoursInProject: 700,
        },
      ],
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.msg).toEqual('Project not found for id: 62891944b389');
  });
  test('Project deleted', async () => {
    const response = await request(app).delete('/projects/62891944b389642a7f13ca58');
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.msg).toEqual('Project deleted.');
  });
  test('Wrong path data, should return error', async () => {
    const response = await request(app).delete('/projects/62891944b389642a7f13');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.msg).toEqual('There was an error');
  });
});
