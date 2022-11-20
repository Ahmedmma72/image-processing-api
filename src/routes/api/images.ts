import { Router } from 'express';
import validateRequest from '../middlewares/validateRequest';
import handleCaching from '../middlewares/handleCaching';
import resizeImage from '../middlewares/resizeImage';
const images = Router();

images.get('/images', validateRequest, handleCaching, resizeImage);

export default images;
