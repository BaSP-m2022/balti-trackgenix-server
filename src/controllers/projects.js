// const fs = require('fs');
// const projects = require('../data/projects.json');

// export const putById = (req, res) => {
//   const { id } = req.params;
//   const {
//     name, description, owner, pm, client, dateStart, employees,
//   } = req.body;

//   let validateStatus = null;

//   if (req.body.status === true || req.body.status === false) {
//     validateStatus = req.body.status;
//   }

//   const updatedProject = {
//     id: parseInt(id, 10),
//     name: name || '',
//     description: description || '',
//     status: validateStatus,
//     owner: owner || '',
//     pm: pm || '',
//     client: client || '',
//     dateStart: dateStart || '',
//     employees: employees || '',
//   };

//   const projectIndex = projects.findIndex((proj) => proj.id === parseInt(id, 10));

//   if (projectIndex !== -1) {
//     projects[projectIndex] = updatedProject;
//     fs.writeFileSync('./src/data/projects.json', JSON.stringify(projects));
//     return res.status(200).json({
//       success: true,
//       data: updatedProject,
//     });
//   }
//   return res.status(400).json({
//     success: false,
//     msg: ('Project not found'),
//   });
// };

// export const deleteById = (req, res) => {
//   const num = parseInt(req.params.id, 10);

//   const ids = projects.map((project) => project.id);

//   const index = ids.indexOf(num);

//   if (index !== -1) {
//     projects.splice(index, 1);
//     fs.writeFileSync('src/data/projects.json', JSON.stringify(projects));
//     return res.status(200).json({
//       success: true,
//       data: projects,
//     });
//   }
//   return res.status(400).json({
//     success: false,
//     msg: ('Project not found'),
//   });
// };

// export const putEmployee = (req, res) => {
//   const { id } = req.params;

//   const {
//     name, roll, salary, hoursInProjects, rates,
//   } = req.body;

//   const newEmployee = {
//     name: name || '',
//     idEmployee: req.body.id || '',
//     roll: roll || '',
//     salary: salary || '',
//     hoursInProjects: hoursInProjects || '',
//     rates: rates || '',
//   };

//   const project = projects.find((proj) => proj.id === parseInt(id, 10));
//   const projectIndex = projects.findIndex((proj) => proj.id === parseInt(id, 10));

//   if (project) {
//     project.employees.push(newEmployee);
//     projects[projectIndex] = project;
//     fs.writeFileSync('./src/data/projects.json', JSON.stringify(projects));
//     return res.status(200).json({
//       success: true,
//       data: project,
//     });
//   }
//   return res.status(400).json({
//     success: false,
//     msg: ('Project not found'),
//   });
// };

// export const getByStatus = (req, res) => {
//   const { status } = req.params;
//   const projectsFilter = projects.filter((proj) => proj.status.toString() === status);
//   if (projectsFilter) {
//     return res.status(200).json({
//       success: true,
//       data: projectsFilter,
//     });
//   }
//   return res.status(400).json({
//     success: false,
//     msg: ('Project not found'),
//   });
// };

// export const allProjects = (req, res) => res.json(projects);

// export const filterById = (req, res) => {
//   const found = projects.find((project) => project.id === +req.params.id);
//   if (found) {
//     res.status(200).json({
//       success: true,
//       data: found,
//     });
//   } else {
//     res.status(400).json({
//       success: false,
//       msg: 'Id not found',
//     });
//   }
// };

// export const createProject = (req, res) => {
//   const newProject = {
//     id: Math.round(Math.random() * 10000),
//     name: req.body.name,
//     description: req.body.description,
//     status: true,
//     owner: req.body.owner,
//     pm: req.body.pm,
//     client: req.body.client,
//     dateStart: req.body.dateStart,
//     employees: req.body.employees,
//   };
//   if (!newProject.id || !newProject.name || !newProject.owner || !newProject.pm
//     || !newProject.client || !newProject.dateStart) {
//     return res.status(400).json({
//       success: false,
//       msg: 'Please include id, name, owner, pm, client and date start.',
//     });
//   }
//   projects.push(newProject);
//   fs.writeFileSync('./src/data/projects.json', JSON.stringify(projects));
//   return res.status(200).json({
//     success: true,
//     data: newProject,
//   });
// };
