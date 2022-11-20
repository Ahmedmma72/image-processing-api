import { existsSync, mkdirSync } from 'fs';
import { Response, Request } from 'express';
import path from 'path';
import sharp from 'sharp';

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
    await sharp(imagePath).resize(w, h).toFile(newImagePath);
  } catch (error) {
    res.status(500).send('failed to process the image');
  }
  console.log('new cached image');
  res.status(200).sendFile(newImagePath);
};

export default resizeImage;
