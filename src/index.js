// use "import" to import libraries
import express from 'express';
import { allProjects, filterById, createProject } from './resources/projects';
// use "require" to import JSON files
const projects = require('./data/projects.json');
// estas dos tenes q borrarlo, lo de arriba
const app = express();
const port = process.env.PORT || 3000;
app.set('json spaces', 2);
app.use(express.json());

// gets all projects
app.get('/projects', allProjects);

// filter by id
app.get('/projects/:id', filterById);
// create project
app.post('/projects', createProject);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

app.get('/projects', async (req, res) => {
  res.send(projects);
});
