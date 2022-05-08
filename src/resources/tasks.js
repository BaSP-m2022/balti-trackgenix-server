const fs = require('fs');
const tasks = require('../data/tasks.json');

export const getTasks = (req, res) => {
  res.status(200).json({
    data: tasks,
  });
};

export const findTaskById = (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const found = tasks.find((element) => element.id === taskId);
  if (found) {
    res.send(found);
  } else {
    res.send(`Id: ${taskId} doesn't exist.`);
  }
};

export const findTask = (req, res) => {
  const id = parseInt(req.query.id, 10);
  const employeeId = parseInt(req.query.employeeId, 10);
  const pmId = parseInt(req.query.pmId, 10);
  const tittleSearch = req.query.tittle;
  const descriptionSearch = req.query.description;
  const dateSearch = req.query.date;
  const doneSearch = req.query.done;

  if (id) {
    const filter = tasks.filter((element) => element.id === id);
    if (filter.length > 0) {
      res.send(filter);
    } else {
      res.send(`Search parameter ${id} doesn't match any`);
    }
  }
  if (employeeId) {
    const filter = tasks.filter((element) => element.employee_id === employeeId);
    if (filter.length > 0) {
      res.send(filter);
    } else {
      res.send(`Search parameter ${employeeId} doesn't match any`);
    }
  }
  if (pmId) {
    const filter = tasks.filter((element) => element.pm_id === pmId);
    if (filter.length > 0) {
      res.send(filter);
    } else {
      res.send(`Search parameter ${pmId} doesn't match any`);
    }
  }
  if (tittleSearch) {
    const filter = tasks.filter((element) => element.tittle === tittleSearch);
    if (filter.length > 0) {
      res.send(filter);
    } else {
      res.send(`Search parameter ${tittleSearch} doesn't match any`);
    }
  }
  if (descriptionSearch) {
    const newList = tasks.filter((task) => task.description.includes(descriptionSearch));
    if (newList.length > 0) {
      res.send(newList);
    } else {
      res.send(`Search parameter ${descriptionSearch} doesn't match any`);
    }
  }
  if (dateSearch) {
    const filter = tasks.filter((element) => element.date === dateSearch);
    if (filter.length > 0) {
      res.send(filter);
    } else {
      res.send(`Search parameter ${dateSearch} doesn't match any`);
    }
  }
  if (doneSearch) {
    let doneBoolean = false;
    if (doneSearch === 'true') {
      doneBoolean = true;
    } else {
      doneBoolean = false;
    }
    const filter = tasks.filter((element) => element.done === doneBoolean);
    if (filter.length > 0) {
      res.send(filter);
    } else {
      res.send(`Search parameter ${doneSearch} doesn't match any`);
    }
  }
};

export const addTask = (req, res) => {
  const taskData = req.body;
  if (taskData.id && taskData.employee_id && taskData.pm_id && taskData.tittle
    && taskData.description && taskData.date && taskData.done === false) {
    tasks.push(taskData);
    fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
      if (err) {
        res.send(err);
      }
    });
    res.send(`Task: ${taskData.tittle} added`);
  } else {
    res.send('Data missing');
  }
};
