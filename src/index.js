// use "import" to import libraries
import express from 'express';
import {
  getTasks, findTaskById, findTask, addTask, deleteTask,
} from './resources/tasks';

// use "require" to import JSON files
const admins = require('./data/admins.json');

const app = express();
const port = process.env.PORT || 3000;

app.set('json spaces', 2);
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.post('/addTask', addTask);
app.delete('/deleteTask', deleteTask);
app.get('/tasks', getTasks);
app.get('/findTasks/:id', findTaskById);
app.get('/filterTasks', findTask);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
