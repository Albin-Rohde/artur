import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (_, res) => {
  return res.json({
    message: 'IT WORKS 🚀 hi soma',
  });
});

const port = process.env.PORT || 1234;

app.listen(port, () =>
  console.log(`App is up and running on http://localhost:${port}`),
);
