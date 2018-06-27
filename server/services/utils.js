module.exports ={
  isLoggedIn: (req, res, next) => {
    return req.session.user ? next() : res.
  }
}