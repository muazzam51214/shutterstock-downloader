import axios from 'axios';
import * as cheerio from 'cheerio';
import { USER_AGENT, REFERER, TIMEOUT } from '../config/constants.js';

export const scrapePreview = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': 'https://www.google.com/',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      timeout: 10000
    });

    const $ = cheerio.load(data);
    const preloadImage = $('source[media="(max-width: 600px)"]').attr('srcset');
    
    if (!preloadImage) throw new Error('No preview image found in preload tag');

    return {
      imageUrl: preloadImage,
      metadata: {
        title: $('title').text(),
        description: $('meta[name="description"]').attr('content')
      }
    };
  } catch (error) {
    console.error(`Scraping error: ${error.message}`);
    throw error;
  }
};