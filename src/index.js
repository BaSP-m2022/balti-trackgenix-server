// use "import" to import libraries
import express from 'express';
import { allProjects, filterById, createProject } from './resources/projects';
import {
  getTasks, findTaskById, findTask, addTask, deleteTask, editTask,
} from './resources/tasks';

const app = express();
const port = process.env.PORT || 4000;

app.set('json spaces', 2);
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/projects', allProjects);
app.get('/projects/:id', filterById);
app.post('/projects', createProject);

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
