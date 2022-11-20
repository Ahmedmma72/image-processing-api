import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { existsSync } from 'fs';

const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { filename, width, height } = req.query;
  if (!filename) {
    res.status(400).send('fileName parameter messing');
    return;
  }
  if (!width) {
    res.status(400).send('width parameter messing');
    return;
  }
  if (!height) {
    res.status(400).send('height parameter messing');
    return;
  }
  const image = (filename as string) + '.jpg';
  const imagePath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'Assets',
    'images',
    image
  );
  if (!existsSync(imagePath)) {
    res.status(404).send('requested image does not exist');
    return;
  }
  const w = Number(width);
  const h = Number(height);
  if (!Number.isInteger(w) || w < 1) {
    res
      .status(400)
      .send('width should be a number greater than or equal to  1');
    return;
  }
  if (!Number.isInteger(h) || h < 1) {
    res.status(400).send('width should be a number greater than or equal to 1');
    return;
  }
  next();
};

export default validateRequest;
