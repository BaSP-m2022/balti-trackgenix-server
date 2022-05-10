const fs = require('fs');
const projects = require('../data/projects.json');

const allProjects = (req, res) => res.json(projects);
const filterById = (req, res) => {
  const found = projects.find((project) => project.id === +req.params.id);
  if (found) {
    res.status(200).json({
      success: true,
      data: found,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'Please include id, name, owner, pm, client and date start.',
    });
  }
};
const createProject = (req, res) => {
  const newProject = {
    id: Math.random() * 10000,
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
    return res.status(400).json({
      success: false,
      msg: 'Please include id, name, owner, pm, client and date start.',
    });
  }
  projects.push(newProject);
  fs.writeFileSync('./src/data/projects.json', JSON.stringify(projects));
  return res.status(200).json({
    success: true,
    data: projects,
  });
};
exports = { allProjects, filterById, createProject };
