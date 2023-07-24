const express = require('express');

const userRoutes=express.Router(); 

//register
userRoutes.post("/register",async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "User registered in route",
      });
    } catch (error) {
      res.json(error);
    }
  });

  
//POST/api/v1/users/login
userRoutes.post("/login", async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "User login",
      });
    } catch (error) {
      res.json(error);
    }
  });
  
  
  // //GET/api/v1/users/:id    //for logout also we are getting into this route
  userRoutes.get("/:id", async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "User Details",
      });
    } catch (error) {
      res.json(error);
    }
  });
  
  //GET/api/v1/users/profile/:id
  userRoutes.get("/profile/:id", async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "User profile in route",
      });
    } catch (error) {
      res.json(error);
    }
  });
  
  //PUT/api/v1/users/profile-photo-upload/:id
  userRoutes.put("/profile-photo-upload/:id", async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "User profile image upload",
      });
    } catch (error) {
      res.json(error);
    }
  });
  
  //PUT/api/v1/users/cover-photo-upload/:id
  userRoutes.put("/cover-photo-upload/:id", async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "User cover image upload",
      });
    } catch (error) {
      res.json(error);
    }
  });
  
  //PUT/api/v1/users/update-password/:id
  userRoutes.put("/update-password/:id", async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "User password update",
      });
    } catch (error) {
      res.json(error);
    }
  });
  
  //PUT/api/v1/users/update/:id
  userRoutes.put("/update/:id", async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "User update",
      });
    } catch (error) {
      res.json(error);
    }
  });
  
  //GET/api/v1/users/logout
  userRoutes.get("/logout", async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "User logout",
      });
    } catch (error) {
      res.json(error);
    }
  });
  

  module.exports = userRoutes;