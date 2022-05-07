// use "import" to import libraries
import express from 'express';
// use "require" to import JSON files
const uuid = require('uuid');
const projects = require('./data/projects.json');

const app = express();
const port = process.env.PORT || 3000;
// console.log(projects.employees);
app.set('json spaces', 2);
app.use(express.json());

// gets all projects
app.get('/projects', (req, res) => res.json(projects));

// filter by id
app.get('/projects/:id', (req, res) => {
  const found = projects.some((project) => project.id === +req.params.id);
  if (found) {
    res.json(projects.filter((element) => (element.id === +req.params.id)));
  } else {
    res.status(400).json({ msg: `No projects with id: ${req.params.id}` });
  }
});
// create project
app.post('/projects', (req, res) => {
  const newProject = {
    id: uuid.v4(),
    name: req.body.name,
    description: req.body.description,
    status: true,
    owner: req.body.owner,
    pm: req.body.pm,
    client: req.body.client,
    dateStart: req.body.dateStart,
    employees: req.body.employees,
  };
  if (!newProject.id || !newProject.name || !newProject.owner || !newProject.pm
    || !newProject.client || !newProject.dateStart) {
    return res.status(400).json({ msg: 'Please include id, name, owner, pm, client and date start' });
  }
  projects.push(newProject);
  return res.json(projects);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

app.get('/projects', async (req, res) => {
  res.send(projects);
});
