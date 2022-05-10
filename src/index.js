// use "import" to import libraries
import express from 'express';
import { createEmployee, updateEmployee } from './resources/employees';

// import { MYFUNCION } from './resources/employees.js'

// use "require" to import JSON files
const admins = require('./data/admins.json');
const employees = require('./data/employees.json');

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

app.get('/employees', (req, res) => {
  res.status(200).json({
    data: employees,
  });
});

// app.get('/admins', MYFUNCION);
app.post('/employees', createEmployee);
app.put('/employees', updateEmployee);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
