module.exports = {
  isLoggedIn: (req, res) => {
    if (req.user !== undefined) {
      return true;
    }
    throw new Error('Must log in first');
  },
};
