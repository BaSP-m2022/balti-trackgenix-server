import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index';

const app = express();
const port = process.env.PORT || 4000;

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

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
