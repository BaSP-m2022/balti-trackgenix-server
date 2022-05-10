const fs = require('fs');
const tasks = require('../data/tasks.json');

export const getTasks = (req, res) => {
  res.status(200).json({
    success: true,
    data: tasks,
  });
  res.status(400).json({
    success: false,
    msg: ('Tasks not found'),
  });
};

export const findTaskById = (req, res) => {
  const taskId = parseInt(req.query.id, 10);
  const found = tasks.find((element) => element.id === taskId);
  if (found) {
    res.status(200).json({
      success: true,
      data: found,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: (`Id: ${taskId} doesn't exist.`),
    });
  }
};

export const findTask = (req, res) => {
  const employeeId = parseInt(req.query.employee_id, 10);
  const projectId = parseInt(req.query.project_id, 10);
  const tittleSearch = req.query.tittle;
  const descriptionSearch = req.query.description;
  const dateSearch = req.query.date;
  const doneSearch = req.query.done;
  let doneBoolean = false;
  if (doneSearch) {
    doneBoolean = false;
    if (doneSearch === 'true') {
      doneBoolean = true;
    } else {
      doneBoolean = false;
    }
  }

  let {
    filtered1, filtered2, filtered3, filtered4, filtered5, filtered6,
  } = [];

  if (employeeId) {
    filtered1 = tasks.filter((element) => element.employee_id === employeeId);
  } else {
    filtered1 = tasks;
  }
  if (projectId) {
    filtered2 = filtered1.filter((element) => element.project_id === projectId);
  } else {
    filtered2 = filtered1;
  }
  if (tittleSearch) {
    filtered3 = filtered2.filter((element) => element.tittle.includes(tittleSearch));
  } else {
    filtered3 = filtered2;
  }
  if (descriptionSearch) {
    filtered4 = filtered3.filter((element) => element.description.includes(descriptionSearch));
  } else {
    filtered4 = filtered3;
  }
  if (dateSearch) {
    filtered5 = filtered4.filter((element) => element.date === dateSearch);
  } else {
    filtered5 = filtered4;
  }
  if (doneSearch) {
    filtered6 = filtered5.filter((element) => element.done === doneBoolean);
  } else {
    filtered6 = filtered5;
  }

  if (filtered6.length > 0) {
    res.status(200).json({
      success: true,
      data: filtered6,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: ('Pameters dot not match'),
    });
  }
};

export const addTask = (req, res) => {
  const taskData = req.body;
  if (taskData.id && taskData.employee_id && taskData.pm_id && taskData.tittle
    && taskData.description && taskData.date && taskData.done !== '') {
    tasks.push(taskData);
    fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
      if (err) {
        res.send(err);
      }
    });
    res.status(200).json({
      success: true,
      msg: ('Task Added'),
      data: taskData,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: ('Data missing'),
    });
  }
};

export const deleteTask = (req, res) => {
  const taskId = parseInt(req.query.id, 10);
  const found = tasks.filter((element) => element.id !== taskId);
  if (tasks.length === found.length) {
    res.send('Task ID not found');
  } else {
    fs.writeFile('src/data/tasks.json', JSON.stringify(found), (err) => {
      if (err) {
        res.send(err);
      }
    });
    res.json({ 'Task deleted': taskId });
  }
};

export const editTask = (req, res) => {
  const taskId = parseInt(req.query.id, 10);
  const taskData = req.body;
  const found = tasks.some((task) => task.id === taskId);
  if (found) {
    tasks.forEach((task, index) => {
      if (task.id === taskId) {
        tasks[index].employee_id = taskData.employee_id;
        tasks[index].pm_id = taskData.pm_id;
        tasks[index].tittle = taskData.tittle;
        tasks[index].description = taskData.description;
        tasks[index].date = taskData.date;
        tasks[index].done = taskData.done;
        fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
          if (err) {
            res.send(err);
          }
        });
      }
    });
  } else {
    res.status(400).json({
      success: false,
      msg: `Task id ${taskId} not found`,
    });
  }
  res.status(200).json({
    success: true,
    msg: (`Task id ${taskData.id} edited`),
    data: taskData,
  });
};
