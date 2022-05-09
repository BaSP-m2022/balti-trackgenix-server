const fs = require('fs');
const tasks = require('../data/tasks.json');

export const getTasks = (req, res) => {
  res.status(200).json({
    Found: tasks,
  });
};

export const findTaskById = (req, res) => {
  const taskId = parseInt(req.query.id, 10);
  const found = tasks.find((element) => element.id === taskId);
  if (found) {
    res.json({ Found: found });
  } else {
    res.send(`Id: ${taskId} doesn't exist.`);
  }
};

export const findTask = (req, res) => {
  const id = parseInt(req.query.id, 10);
  const employeeId = parseInt(req.query.employee_id, 10);
  const pmId = parseInt(req.query.pmId, 10);
  const tittleSearch = req.query.tittle;
  const descriptionSearch = req.query.description;
  const dateSearch = req.query.date;
  const doneSearch = req.query.done;
  const dataRes = [];

  if (id) {
    const filter = tasks.filter((element) => element.id === id);
    if (filter.length > 0) {
      dataRes.push(filter);
      res.json({ 'Found: ': dataRes });
    } else {
      res.json(`Search parameter ${id} doesn't match any ID.`);
    }
  }
  if (employeeId) {
    const filter = tasks.filter((element) => element.employee_id === employeeId);
    if (filter.length > 0) {
      dataRes.push(filter);
      res.json({ 'Found: ': dataRes });
    } else {
      res.send(`Search parameter ${employeeId} doesn't match any employee ID.`);
    }
  }
  if (pmId) {
    const filter = tasks.filter((element) => element.pm_id === pmId);
    if (filter.length > 0) {
      dataRes.push(filter);
      res.json({ Found: dataRes });
    } else {
      res.send(`Search parameter ${pmId} doesn't match any PM ID.`);
    }
  }
  if (tittleSearch) {
    const filter = tasks.filter((task) => task.tittle.includes(tittleSearch));
    if (filter.length > 0) {
      dataRes.push(filter);
      res.json({ Found: dataRes });
    } else {
      res.send(`Search parameter ${tittleSearch} doesn't match any`);
    }
  }
  if (descriptionSearch) {
    const newList = tasks.filter((task) => task.description.includes(descriptionSearch));
    if (newList.length > 0) {
      dataRes.push(newList);
      res.json({ Found: dataRes });
    } else {
      res.send(`Search parameter ${descriptionSearch} doesn't match any description.`);
    }
  }
  if (dateSearch) {
    const filter = tasks.filter((element) => element.date === dateSearch);
    if (filter.length > 0) {
      dataRes.push(filter);
      res.json({ Found: dataRes });
    } else {
      res.send(`Search parameter ${dateSearch} doesn't match any date.`);
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
      dataRes.push(filter);
      res.json({ Found: dataRes });
    } else {
      res.send(`Search parameter ${doneSearch} doesn't match.`);
    }
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
    res.json({ 'Task Added': taskData });
  } else {
    res.send('Data missing');
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
    res.status(400).json({ msg: `Task id ${taskId} not found` });
  }
  res.json({ msg: `Task id ${taskData} edited` });
};
