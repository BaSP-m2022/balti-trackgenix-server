import TasksModel from '../models/Tasks';

export const getTasks = async (req, res) => {
  try {
    let tasks = 0;
    if (req.query) {
      tasks = await TasksModel.find(req.query);
      if (tasks === 0) {
        return res.status(404).json({
          message: 'Error. Nonexistent query.',
          data: undefined,
          error: true,
        });
      }
    } else {
      tasks = await TasksModel.find({});
    }
    return res.status(200).json({
      message: 'Request Successful. All tasks.',
      data: tasks,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export const findTask = async (req, res) => {
  try {
    const taskById = await TasksModel.findById(req.params.id);
    return res.status(200).json({
      message: (`Request Successful. Task with Id: ${req.params.id} found.`),
      data: taskById,
      error: false,
    });
  } catch (err) {
    return res.status(404).json({
      message: (`Id: ${req.params.id} doesn't exist.`),
      data: undefined,
      error: true,
    });
  }
};

export const addTask = async (req, res) => {
  try {
    const taskNew = new TasksModel({
      // employeeId: req.body.employeeId,
      projectId: req.body.projectId,
      title: req.body.tittle,
      // description: req.body.description,
      // date: req.body.date,
      done: req.body.done,
    });
    // const taskNew = new TasksModel(req.body);
    // lo paso a minuscula asi no hay id repetidos, usando unique ?
    // taskNew.toLowerCase();
    // console.log('objeto nuevo: ', taskNew);
    // en el save esta el problema
    const saveTask = await taskNew.save();
    // console.log('objeto despues de guardado: ', saveTask);
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
      message: (`Id: ${id} doesn't exist.`),
      data: undefined,
      error: true,
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTaskById = await TasksModel.findByIdAndDelete(id);
    return res.status(200).json({
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
