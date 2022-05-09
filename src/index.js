// use "import" to import libraries
import express from 'express';
import projects from './resources/projects';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.put('/projects/update/:id', projects.putById);
app.delete('/projects/delete/:id', projects.deleteById);
app.put('/projects/putEmployee/:id', projects.putEmployee);
app.get('/projects/getByStatus/:status', projects.getByStatus);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
