import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';
import 'dotenv/config';

const port = process.env.PORT;
const url = process.env.MONGO_URL;

const app = express();
app.set('json spaces', 2);
app.use(cors());
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
  app.get('/', async (req, res) => {
    res.send('<h1>Hello World! Whats new?</h1>');
  });

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening on port ${port}`);
  });
}

app.use('/', routes);

export default app;
