const express = require('express');
const {
  registerCtrl,
  loginCtrl,
  userDetailsCtrl,
  profileCtrl,
  uploadProfilePhotoCtrl,
  uploadCoverImageCtrl,
  updatePasswordCtrl,
  updataUserCtrl,
  logoutCtrl,
} = require('../../controllers/users/users');

const userRoutes=express.Router(); 

//register
userRoutes.post("/register",registerCtrl);

//POST/api/v1/users/login
userRoutes.post("/login", loginCtrl);
  
//GET/api/v1/users/:id    //for logout also we are getting into this route
userRoutes.get("/:id", userDetailsCtrl);
  
//GET/api/v1/users/profile/:id
userRoutes.get("/profile/:id", profileCtrl);
  
//PUT/api/v1/users/profile-photo-upload/:id
userRoutes.put("/profile-photo-upload/:id", uploadProfilePhotoCtrl);
  
//PUT/api/v1/users/cover-photo-upload/:id
userRoutes.put("/cover-photo-upload/:id",uploadCoverImageCtrl );
  
//PUT/api/v1/users/update-password/:id
userRoutes.put("/update-password/:id", updatePasswordCtrl);
  
//PUT/api/v1/users/update/:id
userRoutes.put("/update/:id", updataUserCtrl);
  
//GET/api/v1/users/logout
userRoutes.get("/logout", logoutCtrl);
  
module.exports = userRoutes;