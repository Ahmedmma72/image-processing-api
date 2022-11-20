import { existsSync } from 'fs';
import { Request, Response, NextFunction } from 'express';
import path from 'path';

const handleCaching = (req: Request, res: Response, next: NextFunction) => {
  const { filename, width, height } = req.query;
  const w = Number(width);
  const h = Number(height);
  const imageName = (filename as string) + `_${w}_${h}.jpg`;
  const cachePath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'Assets',
    'thumb',
    imageName
  );
  if (!existsSync(cachePath)) {
    next();
  } else {
    res.status(304).sendFile(cachePath);
  }
};

export default handleCaching;
