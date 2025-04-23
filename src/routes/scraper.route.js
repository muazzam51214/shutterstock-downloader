import express from 'express';
import { processImageRequest, downloadImage } from '../controllers/scraper.controller.js';
import { validateUrl } from '../middlewares/validation.middleware.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { error: null });
});

router.post('/image', validateUrl, processImageRequest);

router.post('/download', downloadImage);

export default router;