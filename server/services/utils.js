module.exports = {
  isLoggedIn: (req) => {
    if (req.user) {
      return true;
    }
    throw new Error('Must log in first');
  },
};
