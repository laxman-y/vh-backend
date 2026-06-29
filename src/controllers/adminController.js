const getProfile = async (req, res) => {

  res.status(200).json({

    success: true,

    admin: req.admin

  });

};

module.exports = {
  getProfile
};