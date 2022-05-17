import ProjectModel from '../models/Projects';

const allProjects = async (req, res) => {
  try {
    const findAll = await ProjectModel.find([]);
    return res.status(200).json({
      data: findAll,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
      success: false,
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const deleted = await ProjectModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      msg: 'Project deleted',
      data: deleted,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'Project not found.',
      success: false,
    });
  }
};

const filterById = async (req, res) => {
  try {
    const found = await ProjectModel.findById(req.params.id);
    return res.status(200).json({
      data: found,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'Project not found.',
      success: false,
    });
  }
};

const createProject = async (req, res) => {
  const newProject = new ProjectModel({
    projectName: req.body.projectName,
    description: req.body.description,
    status: true,
    owner: req.body.owner,
    pm: req.body.pm,
    client: req.body.client,
    dateStart: req.body.dateStart,
    employees: req.body.employees,
  });
  try {
    const projectCreated = await newProject.s();
    return res.status(200).json({
      msg: 'Project created.',
      data: projectCreated,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      msg: 'Please include id, name, owner, pm, client and date start.',
    });
  }
};

export {
  allProjects,
  deleteById,
  filterById,
  createProject,
};
