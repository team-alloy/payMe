module.exports ={
  isLoggedIn: (req, res) => {
    return req.user ? true : {error: 'Must log in', path: '/login'};
  }
}