const User = require("../../models/user/User");
const bcrypt = require("bcryptjs");
  const registerCtrl = async (req, res) => {
    try {
      //check if the user exists (email)
      const {fullname,email,password} = req.body;
      const userFound = await User.findOne({email});
      if(userFound){
        return res.json({
          status:"failed ",
          data:"user already exists"})
      }
      //Hash password
      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(password,salt);
      //create user with the given details
      const user = await User.create({
        fullname,
        email,
        password:passwordHashed,
      });
      res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.json(error);
    }
  }

  const loginCtrl = async (req, res) => {
    try {
      //check if the user exists (email)
      const {email,password} = req.body;
      const userFound = await User.findOne({email});
      if(!userFound){
       return res.json({
          status:"failed",
          message:"invalid login credentials"
        })
      }
      //check if the password is correct
      const isPasswordValid = await bcrypt.compare(password,userFound.password);
      if(!isPasswordValid){
       return res.json({
          status:"failed",
          message:"invalid login credentials"
        })
      }
      //send the user details
      res.json({
        status: "Login success",
        data: userFound,
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