const TasksModel = require('../models/Tasks');

// const tasks = require('../data/tasks.json');
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
  const { id } = req.params;
  try {
    const task = await TasksModel.findById(id);
    return res.status(200).json({
      message: (`Request Successful. Task with Id: ${id}founded.`),
      data: task,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: (`Id: ${id} doesn't exist.`),
      data: undefined,
      error: true,
    });
  }
};

// export const findTask = (req, res) => {
//   const employeeId = parseInt(req.query.employee_id, 10);
//   const projectId = parseInt(req.query.project_id, 10);
//   const tittleSearch = req.query.tittle;
//   const descriptionSearch = req.query.description;
//   const dateSearch = req.query.date;
//   const doneSearch = req.query.done;
//   let doneBoolean = false;
//   if (doneSearch) {
//     doneBoolean = false;
//     if (doneSearch === 'true') {
//       doneBoolean = true;
//     } else {
//       doneBoolean = false;
//     }
//   }

//   let filtered = tasks;

//   if (employeeId) {
//     filtered = filtered.filter((element) => element.employee_id === employeeId);
//   }
//   if (projectId) {
//     filtered = filtered.filter((element) => element.project_id === projectId);
//   }
//   if (tittleSearch) {
//     filtered = filtered.filter((element) => element.tittle.includes(tittleSearch));
//   }
//   if (descriptionSearch) {
//     filtered = filtered.filter((element) => element.description.includes(descriptionSearch));
//   }
//   if (dateSearch) {
//     filtered = filtered.filter((element) => element.date === dateSearch);
//   }
//   if (doneSearch) {
//     filtered = filtered.filter((element) => element.done === doneBoolean);
//   }

//   if (filtered.length > 0) {
//     res.status(200).json({
//       success: true,
//       data: filtered,
//     });
//   } else {
//     res.status(400).json({
//       success: false,
//       msg: ('Pameters dot not match'),
//     });
//   }
// };

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
    // lo paso a minuscula asi no hay id repetidos, usando unique
    taskNew.toLowerCase();
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

// export const deleteTask = (req, res) => {
//   const taskId = parseInt(req.query.id, 10);
//   const found = tasks.filter((element) => element.id !== taskId);
//   if (tasks.length === found.length) {
//     res.send('Task ID not found');
//   } else {
//     fs.writeFile('src/data/tasks.json', JSON.stringify(found), (err) => {
//       if (err) {
//         res.status(400).json({
//           success: false,
//           msg: ('Task not found.'),
//         });
//       }
//     });
//     res.status(200).json({
//       success: true,
//       msg: (`Task id: ${taskId} deleted.`),
//     });
//   }
// };

// export const editTask = (req, res) => {
//   const taskId = parseInt(req.query.id, 10);
//   const taskData = req.body;
//   const found = tasks.some((task) => task.id === taskId);
//   if (found) {
//     tasks.forEach((task, index) => {
//       if (task.id === taskId) {
//         tasks[index].employee_id = taskData.employee_id;
//         tasks[index].pm_id = taskData.pm_id;
//         tasks[index].tittle = taskData.tittle;
//         tasks[index].description = taskData.description;
//         tasks[index].date = taskData.date;
//         tasks[index].done = taskData.done;
//         fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
//           if (err) {
//             res.send(err);
//           }
//         });
//       }
//     });
//   } else {
//     res.status(400).json({
//       success: false,
//       msg: `Task id ${taskId} not found`,
//     });
//   }
//   res.status(200).json({
//     success: true,
//     msg: (`Task id ${taskData.id} edited`),
//     data: taskData,
//   });
// };
