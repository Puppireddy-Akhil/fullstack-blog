const express = require("express");
const {
  createPostCtrl,
  fetchPostCtrl,
  fetchPostsCtrl,
  deletePostCtrl,
  updatePostCtrl,
} = require("../../controllers/posts/post");

const postRoutes = express.Router();
//POST/api/v1/posts
postRoutes.post("/", createPostCtrl);

//GET/api/v1/posts
postRoutes.get("/", fetchPostsCtrl);

//GET/api/v1/posts/:id
postRoutes.get("/:id", fetchPostCtrl);

//DELETE/api/v1/posts/:id
postRoutes.delete("/:id", deletePostCtrl);

//PUT/api/v1/posts/:id
postRoutes.put("/:id", updatePostCtrl);

module.exports = postRoutes;