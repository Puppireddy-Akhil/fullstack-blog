
  const registerCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "User registered in controller",
      });
    } catch (error) {
      res.json(error);
    }
  }

  const loginCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "User login in controller",
      });
    } catch (error) {
      res.json(error);
    }
  }

  const userDetailsCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "User Details in controller",
      });
    } catch (error) {
      res.json(error);
    }
  }

  const profileCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "User profile in controller",
      });
    } catch (error) {
      res.json(error);
    }
  }

  const uploadProfilePhotoCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "User profile image upload",
      });
    } catch (error) {
      res.json(error);
    }
  }

  const uploadCoverImageCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "User cover image upload",
      });
    } catch (error) {
      res.json(error);
    }
  }

  const updatePasswordCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "User password update",
      });
    } catch (error) {
      res.json(error);
    }
  }
  
  const updataUserCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "User update",
      });
    } catch (error) {
      res.json(error);
    }
  }

  const logoutCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "User logout",
      });
    } catch (error) {
      res.json(error);
    }
  }

  module.exports = {
    registerCtrl,
    loginCtrl,
    userDetailsCtrl,
    profileCtrl,
    uploadProfilePhotoCtrl,
    uploadCoverImageCtrl,
    updatePasswordCtrl,
    updataUserCtrl,
    logoutCtrl,
  };