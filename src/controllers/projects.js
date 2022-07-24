import Projects from '../models/Projects';

export const getAllProjects = async (req, res) => {
  try {
    const findAll = await Projects.find({}).populate('employees.employeeId').populate('admin');
    return res.status(200).json({
      message: 'All the projects found',
      data: findAll,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
      error: true,
    });
  }
};

export const deleteById = async (req, res) => {
  try {
    const projectToDelete = await Projects.findById(req.params.id).populate('employees.employeeId').populate('admin');
    const { employees } = projectToDelete;
    const deleted = await Projects.findByIdAndDelete(req.params.id);
    employees.forEach((employee) => {
      employee.assignedProject.filter((project) => project._id !== projectToDelete._id);
    });
    if (!deleted) {
      return res.status(404).json({
        message: 'Project not found.',
        data: undefined,
        error: true,
      });
    } return res.status(200).json({
      message: 'Project deleted.',
      data: deleted,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const newProjects = new Projects({
      ...req.body,
    });
    await newProjects.save();
    const { employees } = newProjects;
    employees.forEach((employee) => {
      employee.assignedProject.push(newProjects._id);
    });
    return res.status(201).json({
      message: 'New Project successfully created',
      data: newProjects,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'There was an error',
      data: error,
      error: false,
    });
  }
};

export const updateProjectById = async (req, res) => {
  try {
    const originalProject = await Projects.findById(req.params.id).populate('employees.employeeId').populate('admin');
    const originalEmployees = originalProject.employees;
    const updatedProject = await Projects.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    ).populate('employees.employeeId').populate('admin');
    const updatedEmployees = updatedProject.employees;
    const newEmployees = updatedEmployees.filter((employeeId) => !originalEmployees.includes(employeeId));
    newEmployees.forEach((employee) => {
      employee.assignedProject.push(updatedProject._id);
    });
    const deletedEmployees = originalEmployees.filter((employeeId) => !updatedEmployees.includes(employeeId));
    deletedEmployees.forEach((employee) => {
      employee.assignedProject.filter((project) => project._id !== updatedProject._id);
    });
    if (!updatedProject) {
      return res.status(404).json({
        message: `Project not found for id: ${req.params.id}`,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Project with id ${req.params.id} has been successfully updated!`,
      data: updatedProject,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'There was an error',
      data: error,
      error: true,
    });
  }
};

export const getProjectsByStatus = async (req, res) => {
  try {
    const activeProjects = await Projects.find({
      isActive: req.params.status,
    }).populate('employees.employeeId').populate('admin');
    if (activeProjects.length) {
      return res.status(200).json({
        message: 'Obtained projects!',
        data: activeProjects,
        error: false,
      });
    }
    return res.status(400).json({
      message: `Projects not found for status: ${req.params.status}`,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'There was an error',
      data: error,
      error: true,
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const wantedProject = await Projects.findById(req.params.id).populate('employees.employeeId').populate('admin');
    if (wantedProject) {
      return res.status(200).json({
        message: 'Successful search!',
        data: wantedProject,
        error: false,
      });
    }
    return res.status(400).json({
      message: `Project not found for id: ${req.params.id}`,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'There was an error',
      data: error,
      error: true,
    });
  }
};
