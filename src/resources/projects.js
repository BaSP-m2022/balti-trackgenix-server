const failSis = require('fs');
const projects = require('../data/projects.json');

function putById(req, res) {
  const { id } = req.params;

  const {
    name, description, status, owner, pm, client, dateStart, employees,
  } = req.body;

  const updatedProject = {
    id: parseInt(id, 10),
    name: name || '',
    description: description || '',
    status: status || '',
    owner: owner || '',
    pm: pm || '',
    client: client || '',
    dateStart: dateStart || '',
    employees: employees || '',
  };

  const projectIndex = projects.findIndex((proj) => proj.id === parseInt(id, 10));

  if (projectIndex !== -1) {
    projects[projectIndex] = updatedProject;
    failSis.writeFileSync('./src/data/projects.json', JSON.stringify(projects));
    res.status(200).json({ msg: 'Project updated', updatedProject });
  } else {
    res.status(404).json({ msg: 'Project not found' });
  }
}

function deleteById(req, res) {
  const { id } = req.params;

  const projectIndex = projects.findIndex((proj) => proj.id === parseInt(id, 10));

  if (projectIndex !== -1) {
    projects.splice(id, 1);
    failSis.writeFileSync('./src/data/projects.json', JSON.stringify(projects));
    res.status(200).json({ msg: 'Project delete', projects });
  } else {
    res.status(404).json({ msg: 'Project not found' });
  }
}

function putEmployee(req, res) {
  const { id } = req.params;

  const {
    name, roll, salary, hoursInProjects, rates,
  } = req.body;

  const newEmployee = {
    name: name || '',
    idEmployee: req.body.id || '',
    roll: roll || '',
    salary: salary || '',
    hoursInProjects: hoursInProjects || '',
    rates: rates || '',
  };

  const project = projects.find((proj) => proj.id === parseInt(id, 10));
  const projectIndex = projects.findIndex((proj) => proj.id === parseInt(id, 10));

  if (project) {
    project.employees.push(newEmployee);
    projects[projectIndex] = project;
    failSis.writeFileSync('./src/data/projects.json', JSON.stringify(projects));
    res.status(200).json({ msg: 'Employee added', project });
  } else {
    res.status(404).json({ msg: 'Project not found' });
  }
}

function getByStatus(req, res) {
  const { status } = req.params;
  const projectsFilter = projects.filter((proj) => proj.status.toString() === status);
  if (projectsFilter) {
    res.status(200).json(projectsFilter);
  } else {
    res.status(404).json({ msg: 'Project not found' });
  }
}

module.exports = {
  putById,
  deleteById,
  putEmployee,
  getByStatus,
};
