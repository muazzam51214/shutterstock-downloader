export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('index', { 
    error: err.message || 'Something went wrong' 
  });
};

export const notFound = (req, res) => {
  res.status(404).render('index', { 
    error: 'Page not found' 
  });
};