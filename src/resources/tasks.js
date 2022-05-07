const tasks = require('../data/tasks.json');

export const getTasks = (req, res) => {
  res.status(200).json({
    data: tasks,
  });
};

export const getTasks1 = (req, res) => {
  res.status(200).json({
    data: tasks,
  });
};
