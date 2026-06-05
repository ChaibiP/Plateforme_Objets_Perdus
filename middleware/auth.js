function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    return res.send("Vous devez être connecté");
  }
  next();
}
module.exports = { isLoggedIn };