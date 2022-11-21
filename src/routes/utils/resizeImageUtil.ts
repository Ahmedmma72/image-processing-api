import sharp from 'sharp';
const resizeImageUtil = async (
  imagePath: string,
  width: number,
  height: number,
  newImagePath: string
): Promise<void> => {
  try {
    await sharp(imagePath).resize(width, height).toFile(newImagePath);
  } catch (error) {
    throw new Error('error processing the image');
  }
};
export default resizeImageUtil;
