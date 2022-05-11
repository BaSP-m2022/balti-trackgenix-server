// use "import" to import libraries
import express from 'express';
import {
  deleteTimeSheets, getTimeSheets, addTimeSheet, editTimeSheet, getAllTimeSheetsByEmployee,
} from './resources/time-sheets';
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

app.get('/time-sheets/:id', getTimeSheets);
app.delete('/time-sheets', deleteTimeSheets);
app.post('/time-sheets/add', addTimeSheet);
app.put('/time-sheets/edit/:id', editTimeSheet);
app.get('/time-sheets/get-all-time-sheets-by-employee/:id', getAllTimeSheetsByEmployee);

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

app.get('/employees', getEmployees);
app.get('/employees/:dni', filterByDni);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
