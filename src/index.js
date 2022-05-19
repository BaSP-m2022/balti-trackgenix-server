import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const url = process.env.MONGO_URL;
app.set('json spaces', 2);

app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(
    url,
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
}
app.use('/', routes);

app.get('/', async (req, res) => {
  res.send('<h1>Hello World! Whats new?</h1>');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

export default app;
