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

module.exports = {
  putById,
  deleteById,
};

/*
Crear un Project
Editar un Project
Obtener un Project
Eliminar un Project
Obtener la lista de Projects con la opción de usar filtros
Asignar un Employee a un Projects con un rol(QA, PM, DEV, TL)

Create — POST
Read/Retrieve — GET
Update — PUT/PATCH
Delete — DELETE
*/
