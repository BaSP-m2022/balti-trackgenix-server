// use "import" to import libraries
import express from 'express';
import { createEmployee, deleteEmployee, updateEmployee } from './resources/employees';

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

app.post('/employees', createEmployee);
app.put('/employees', updateEmployee);
app.delete('/employees', deleteEmployee);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
