import { Router } from 'express';
import middleware from './utilities/middleware';
const router = Router();

router.get('/', middleware, (req, res) => {
  res.send('testing routes');
});

export default router;
