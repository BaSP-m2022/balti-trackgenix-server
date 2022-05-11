// use "import" to import libraries
import express from 'express';
import {
  putById, deleteById, putEmployee, getByStatus,
} from './resources/projects';

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

app.put('/projects/:id', putById);
app.delete('/projects/:id', deleteById);
app.put('/projects/put-employee/:id', putEmployee);
app.get('/projects/get-by-status/:status', getByStatus);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
