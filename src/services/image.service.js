import sharp from 'sharp';
import { CROP_PIXELS, IMAGE_QUALITY } from '../config/constants.js';

export const processImage = async (buffer) => {
  try {
    const metadata = await sharp(buffer).metadata();
    
    return await sharp(buffer)
      .extract({
        left: 0,
        top: 0,
        width: metadata.width,
        height: metadata.height - CROP_PIXELS
      })
      .jpeg({ quality: IMAGE_QUALITY })
      .toBuffer();
  } catch (error) {
    console.error(`Image processing error: ${error.message}`);
    throw error;
  }
};