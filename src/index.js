// use 'import' to import libraries
import express from 'express';
import { addSA, findSA } from './resources/super-admins';
// use 'require' to import JSON files
const admins = require('./data/admins.json');
const sAdmins = require('./data/super-admins.json');

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

app.get('/super-admins', (req, res) => {
  res.status(200).json({ data: sAdmins });
});
app.get('/super-admins/:id', findSA);
app.post('/super-admins', addSA);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
