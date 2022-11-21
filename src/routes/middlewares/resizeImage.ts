import { existsSync, mkdirSync } from 'fs';
import { Response, Request } from 'express';
import path from 'path';
import resizeImageUtil from '../utils/resizeImageUtil';

const resizeImage = async (req: Request, res: Response): Promise<void> => {
  const { filename, width, height } = req.query;
  const w = Number(width);
  const h = Number(height);
  const image = (filename as string) + '.jpg';
  const newImage = (filename as string) + `_${w}_${h}.jpg`;
  const imagePath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'Assets',
    'images',
    image
  );
  const cachePath = path.join(__dirname, '..', '..', '..', 'Assets', 'thumb');
  if (!existsSync(cachePath)) {
    mkdirSync(cachePath);
  }
  const newImagePath = path.join(cachePath, newImage);
  try {
    await resizeImageUtil(imagePath, w, h, newImagePath);
  } catch (error) {
    res.status(500).send('failed to process the image');
    return;
  }
  res.status(200).sendFile(newImagePath);
};

export default resizeImage;
