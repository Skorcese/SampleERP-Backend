const handleError = (err, res) => {
    res
      .status(500)
      .send(`<h3>Error 500: Internal server Error</h3><h2>${err.message}</h2>`);
  };
  
  module.exports = handleError;
  