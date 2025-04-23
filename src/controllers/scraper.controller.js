import { scrapePreview } from '../services/scraper.service.js';
import { processImage } from '../services/image.service.js';
import axios from 'axios';
import { REFERER } from '../config/constants.js';

export const processImageRequest = async (req, res, next) => {
  try {
    const { url } = req.body;
    
    // Scrape data
    const { imageUrl, metadata } = await scrapePreview(url);
    
    // Download image
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: { Referer: REFERER }
    });

    // Process image
    const processedImage = await processImage(response.data);
    const base64Image = processedImage.toString('base64');

    res.render('result', {
      imageSrc: `data:image/jpeg;base64,${base64Image}`,
      base64Image,
      metadata
    });

  } catch (error) {
    next(error);
  }
};

export const downloadImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.redirect('/');
    
    const imageBuffer = Buffer.from(image, 'base64');
    
    res.setHeader('Content-Disposition', 'attachment; filename="shutterstock_preview.jpg"');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(imageBuffer);

  } catch (error) {
    console.error('Download failed:', error);
    res.redirect('/');
  }
};