import express from 'express';
import router from './routes/indexRoutes';
import { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use('/api', router);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

//handle non existing routes
app.use((req: Request, res: Response) => {
  res.status(404).send('Not found');
});

export default app;
