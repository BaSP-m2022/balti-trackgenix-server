import Projects from '../models/Projects';

export const updateProjectById = async (req, res) => {
  try {
    const projectToUpdate = await Projects.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!projectToUpdate) {
      return res.status(400).json({
        msg: `Project not found for id: ${req.params.id}`,
        error: true,
      });
    }
    return res.status(200).json({
      msg: `Project with id ${req.params.id} has been successfully updated!`,
      data: projectToUpdate,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error',
      data: error,
      error: true,
    });
  }
};

export const getProjectsByStatus = async (req, res) => {
  try {
    const activeProjects = await Projects.find({ isActive: req.params.status });
    if (activeProjects.length) {
      return res.status(200).json({
        msg: 'Obtained projects!',
        data: activeProjects,
        error: false,
      });
    }
    return res.status(400).json({
      msg: `Projects not found for status: ${req.params.status}`,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error',
      data: error,
      error: true,
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Projects.find({});

    return res.status(200).json({
      msg: 'Successful query',
      data: allProjects,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error',
      data: error,
      error: true,
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const wantedProject = await Projects.findById(req.params.id);

    if (wantedProject) {
      return res.status(200).json({
        msg: 'Successful search!',
        data: wantedProject,
        error: false,
      });
    }
    return res.status(400).json({
      msg: `Project not found for id: ${req.params.id}`,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error',
      data: error,
      error: true,
    });
  }
};

export const createNewProject = async (req, res) => {
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
