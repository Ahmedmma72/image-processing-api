import { Router } from 'express';
import validateRequest from '../utilities/validateRequest';
import handleCaching from '../utilities/handleCaching';
import resizeImage from '../utilities/resizeImage';
const images = Router();

images.get('/images', validateRequest, handleCaching, resizeImage);

export default images;
