import Projects from '../models/Projects';
import Employees from '../models/Employees';

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
    Promise.all(employees.map(async (employee) => {
      const currentEmployee = await Employees.findById(employee.employeeId);
      const index = currentEmployee.assignedProjects.indexOf(projectToDelete._id);
      currentEmployee.assignedProjects.splice(index, 1);
      await currentEmployee.save();
    }));
    const deleted = await Projects.findByIdAndDelete(req.params.id);
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
    Promise.all(employees.map(async (employee) => {
      const currentEmployee = await Employees.findById(employee.employeeId);
      currentEmployee.assignedProjects.push(newProjects._id);
      await currentEmployee.save();
    }));
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
    Promise.all(updatedEmployees.map(async (newEmployee) => {
      const currentEmployee = await Employees.findById(newEmployee.employeeId);
      if (!(currentEmployee.assignedProjects.includes(req.params.id))) {
        currentEmployee.assignedProjects.push(updatedProject._id);
        await currentEmployee.save();
      }
    }));
    // Promise.all(originalEmployees.map(async (deletedEmployee) => {
    //   const currentEmployee = await Employees.findById(deletedEmployee.employeeId);
    //   const index = currentEmployee.assignedProjects.indexOf(originalProject._id);
    //   currentEmployee.assignedProjects.splice(index, 1);
    //   await currentEmployee.save();
    // }));
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
