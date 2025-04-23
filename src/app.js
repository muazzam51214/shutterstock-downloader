import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import scraperRouter from './routes/scraper.route.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';

// ES modules equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', scraperRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

export {app};