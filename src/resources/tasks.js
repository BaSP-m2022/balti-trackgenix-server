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
    res.send(`Id ${taskId} doesn't exist.`);
  }
};
