import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index';
import {
  addAdmin, findAdmin, delAdmin, editAdmin, getAllAdmins,
} from './controllers/admins';
import {
  addSuperAdmin, findSuperAdmin, delSuperAdmin, editSuperAdmin, getAllSuperAdmin,
} from './controllers/super-admins';
import {
  putById, deleteById, putEmployee, getByStatus, allProjects, filterById, createProject,
} from './controllers/projects';
import {
  deleteTimeSheets, getTimeSheets, addTimeSheet, editTimeSheet, getAllTimeSheetsByEmployee,
} from './controllers/time-sheets';
import {
  getTasks, findTaskById, findTask, addTask, deleteTask, editTask,
} from './controllers/tasks';

const app = express();
const port = process.env.PORT || 3000;

const MONGO_URL = 'mongodb+srv://BaSP:BaSP2022@cluster0.nsjbc.mongodb.net/BaSP_Database?retryWrites=true&w=majority';
app.set('json spaces', 2);

app.use(express.json());

mongoose.connect(
  MONGO_URL,
  (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('Not connected: ', error);
    } else {
      // eslint-disable-next-line no-console
      console.log('Connected to MONGO DB');
    }
  },
);

app.use(router);

app.get('/', async (req, res) => {
  res.send('<h1>Hello World! Whats new?</h1>');
});

app.get('/projects', allProjects);
app.get('/projects/:id', filterById);
app.post('/projects', createProject);
app.put('/projects/:id', putById);
app.delete('/projects/:id', deleteById);
app.put('/projects/put-employee/:id', putEmployee);
app.get('/projects/get-by-status/:status', getByStatus);

app.get('/time-sheets/:id', getTimeSheets);
app.delete('/time-sheets', deleteTimeSheets);
app.post('/time-sheets/add', addTimeSheet);
app.put('/time-sheets/edit/:id', editTimeSheet);
app.get('/time-sheets/get-all-time-sheets-by-employee/:id', getAllTimeSheetsByEmployee);

app.post('/tasks', addTask);
app.put('/tasks', editTask);
app.delete('/tasks', deleteTask);
app.get('/tasks', getTasks);
app.get('/tasks/get-by-id', findTaskById);
app.get('/tasks/filter', findTask);

app.get('/super-admins', getAllSuperAdmin);
app.get('/super-admins/:id', findSuperAdmin);
app.post('/super-admins', addSuperAdmin);
app.delete('/super-admins', delSuperAdmin);
app.put('/super-admins', editSuperAdmin);

app.get('/admins/:id', findAdmin);
app.get('/admins', getAllAdmins);
app.post('/admins', addAdmin);
app.delete('/admins', delAdmin);
app.put('/admins', editAdmin);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
