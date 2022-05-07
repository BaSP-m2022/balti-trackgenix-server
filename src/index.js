// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const admins = require('./data/admins.json');
const employees = require('./data/employees.json');

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

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

/* example to get data from postman */

app.get('/employees', (req, res) => res.json(employees));

/* example to get a single employee by first name */
app.get('/employees/:first_name', (req, res) => {
  res.json(employees.filter((employee) => employee.first_name === req.params.first_name));
});

/* example to get a single employee by last name */
app.get('/employees/:last_name', (req, res) => {
  res.json(employees.filter((employee) => employee.last_name === req.params.last_name));
});

/* example to get a single employee by email */
app.get('/employees/:email', (req, res) => {
  res.json(employees.filter((employee) => employee.email === req.params.email));
});

/* example to get a single employee by dni */
app.get('/employees/:dni', (req, res) => {
  const found = employees.some((employee) => employee.dni === parseInt(req.params.dni, 10));
  if (found) {
    res.json(employees.filter((element) => (element.dni === parseInt(req.params.dni, 10))));
  } else {
    res.status(400).json({ msg: `No employees with dni: ${req.params.dni}` });
  }
});
