// use "import" to import libraries
import express from 'express';
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
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.post('/addTask', addTask);
app.put('/editTask', editTask);
app.delete('/deleteTask', deleteTask);
app.get('/getAllTasks', getTasks);
app.get('/getATask', findTaskById);
app.get('/filterTasks', findTask);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
