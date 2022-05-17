import TasksModel from '../models/Tasks';

export const getTasks = async (req, res) => {
  try {
    const tasks = await TasksModel.find({});
    return res.status(200).json({
      message: 'Request Successful. All tasks',
      data: tasks,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Error, bad request',
      data: undefined,
      error: true,
    });
  }
};

export const findTask = async (req, res) => {
  // const { id } = req.params;
  try {
    const taskById = await TasksModel.findById(req.params.id);
    // return res.status(200).json({});
    return res.status(200).json({
      message: (`Request Successful. Task with Id: ${req.params.id} found.`),
      data: taskById,
      error: false,
    });
  } catch (err) {
    return res.status(404).json({
      // message: (`Id: ${id} doesn't exist.`),
      message: ('Id: doesnt exist.'),
      data: undefined,
      error: true,
    });
  }
};

export const addTask = async (req, res) => {
  try {
    const taskNew = new TasksModel({
      employeeId: req.body.employeeId,
      projectId: req.body.pmId,
      title: req.body.tittle,
      description: req.body.description,
      // date: req.body.date,
      done: req.body.done,
    });
    // lo paso a minuscula asi no hay id repetidos, usando unique ?
    // taskNew.toLowerCase();
    const saveTask = await taskNew.save();
    return res.status(201).json({
      message: 'Task Added',
      data: saveTask,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Please include id, project ID, title and done.',
      data: undefined,
      error: true,
    });
  }
};

export const editTask = async (req, res) => {
  const { id } = req.params;
  try {
    const modifiedTask = await TasksModel.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({
      message: 'Task Modified',
      data: modifiedTask,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error Id dont exist',
      data: undefined,
      error: true,
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTaskById = await TasksModel.findByIdAndDelete(id);
    return res.status(204).json({
      message: 'Task Deleted',
      data: deleteTaskById,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Task with id: ${id} not found`,
      data: undefined,
      error: true,
    });
  }
};
