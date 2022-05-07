// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const projects = require('./data/projects.json');

const app = express();
const port = process.env.PORT || 3000;
console.log(projects[1].id);
app.set('json spaces', 2);
app.use(express.json());

app.get('/nicokun', (req, res) => res.json(projects));

// app.get('/', async (req, res) => {
//   res.send('hola');
// });

// app.get('/projects/:id', (req, res) => {
//   // res.send('hola');
//   res.status(200).json({
//     // if(projects.id === id){
//     //   res.send(projets);
//     // }
//   });
// });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

app.get('/projects', async (req, res) => {
  res.send(projects);
});
