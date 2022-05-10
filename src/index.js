// use "import" to import libraries
import express from 'express';
import { filterByDni, getEmployees } from './resources/employees';
import {
  getTasks, findTaskById, findTask, addTask, deleteTask, editTask,
} from './resources/tasks';

// use "require" to import JSON files
const admins = require('./data/admins.json');

const app = express();
const port = process.env.PORT || 3000;

app.set('json spaces', 2);
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('<h1>Hello World! Whats new?</h1>');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.post('/tasks', addTask);
app.put('/tasks', editTask);
app.delete('/tasks', deleteTask);
app.get('/tasks', getTasks);
app.get('/tasks/get-by-id', findTaskById);
app.get('/tasks/filter', findTask);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

app.get('/employees', getEmployees);
app.get('/employees/:dni', filterByDni);
