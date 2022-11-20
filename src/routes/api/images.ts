import { Router } from 'express';
const images = Router();

images.get('/', (req, res) => {
  res.send('initial images router');
});

export default images;
