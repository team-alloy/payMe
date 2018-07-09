module.exports = {
  isLoggedIn: (req) => {
    if (req.user !== undefined) {
      return true;
    }
    throw new Error('Must log in first');
  },
};
