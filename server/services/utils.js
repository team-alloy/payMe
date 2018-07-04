module.exports = {
  isLoggedIn: (req, res) => {
    if(req.user !== undefined) {
      return true;
    } else {
      throw new Error('Must log in first');
    }
  },
};
