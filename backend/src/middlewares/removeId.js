const removeId = (req, res, next) => {
  if (req.body.id) {
    delete req.body.id;
  }
  next();
};

module.exports = removeId;
