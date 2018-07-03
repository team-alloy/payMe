module.exports = {
  isLoggedIn: (req, res) => (req.user ? true : { error: 'Must log in', path: '/login' }),
};
