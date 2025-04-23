export const validateUrl = (req, res, next) => {
  const { url } = req.body;
  
  if (!url || !url.includes('shutterstock.com')) {
    return res.render('index', { 
      error: 'Please provide a valid Shutterstock URL' 
    });
  }
  
  next();
};