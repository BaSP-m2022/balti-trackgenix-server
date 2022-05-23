import request from 'supertest';
import app from '../index';
import Projects from '../models/Projects';
import projectsSeed from '../seed/projects';

// let projectID;

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
});

describe('/GET /projects', () => {
  test('return status 200 projects', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.error).toBeFalsy();
  });
  test('Response should return one project', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
/*  test('Project updated', async () => {
    const response = await request(app).put(`/projects/${projectID}`).send({
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

    expect(response.statusCode).toBe(200);
  });
  test('Project deleted', async () => {
    const response = await request(app).delete(`/projects/${projectID}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
  }); */
});
