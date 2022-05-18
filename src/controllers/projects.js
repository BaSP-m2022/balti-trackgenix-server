import Projects from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    const findAll = await Projects.find({});
    return res.status(200).json({
      msg: 'All the projects found',
      data: findAll,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      msg: err,
      error: true,
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const deleted = await Projects.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        msg: 'Project not found.',
        data: undefined,
        error: true,
      });
    } return res.status(200).json({
      msg: 'Project deleted.',
      data: deleted,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'there was an error',
      data: undefined,
      error: true,
    });
  }
};

const createProject = async (req, res) => {
  try {
    const newProjects = new Projects({
      ...req.body,
    });
    await newProjects.save();
    return res.status(201).json({
      msg: 'New Project successfully created',
      data: newProjects,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'There was an error',
      data: error,
      error: false,
    });
  }
};

export {
  getAllProjects,
  deleteById,
  createProject,
};
