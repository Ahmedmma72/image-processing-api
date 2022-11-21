import { existsSync, unlinkSync, mkdirSync } from 'fs';
import path, { dirname } from 'path';
import resizeImageUtil from '../../routes/utils/resizeImageUtil';
describe('testing the resize image utility', () => {
  const imageName = 'encenadaport.jpg';
  const width = 100;
  const height = 100;
  const imagePath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'Assets',
    'images',
    imageName
  );
  const cachedImageName = `encenadaport_${width}_${height}.jpg`;
  const cachedImagePath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'Assets',
    'thumb',
    cachedImageName
  );
  beforeAll(() => {
    //create a thumb directory if it does not exists
    if (!existsSync(dirname(cachedImagePath))) {
      mkdirSync(dirname(cachedImagePath));
    }
  });
  beforeEach(() => {
    //delete the cached image if it exists
    if (existsSync(cachedImagePath)) {
      unlinkSync(cachedImagePath);
    }
  });
  afterEach(() => {
    //deleting the new generated cached
    if (existsSync(cachedImagePath)) {
      unlinkSync(cachedImagePath);
    }
  });
  it('test giving correct parameter that a new cache of the image will be produced', async () => {
    await resizeImageUtil(imagePath, width, height, cachedImagePath);
    expect(existsSync(cachedImagePath)).toBeTrue();
  });
  it('test sending an invalid image path then it should through an error', async () => {
    await expectAsync(
      resizeImageUtil('', width, height, cachedImagePath)
    ).toBeRejectedWithError();
  });
  it('test sending an invalid width then it should through an error', async () => {
    await expectAsync(
      resizeImageUtil(imagePath, -100, height, cachedImagePath)
    ).toBeRejectedWithError();
  });
  it('test sending an invalid invalid height then it should through an error', async () => {
    await expectAsync(
      resizeImageUtil(imagePath, width, -100, cachedImagePath)
    ).toBeRejectedWithError();
  });
  it('test sending an invalid cached image path then it should through an error', async () => {
    await expectAsync(
      resizeImageUtil(imagePath, width, height, '')
    ).toBeRejectedWithError();
  });
});
