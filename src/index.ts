import express from 'express';
import router from './routes/indexRoutes';

const app = express();
const port = 3000;

app.use('/api', router);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
