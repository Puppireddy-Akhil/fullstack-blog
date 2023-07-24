const express = require("express");

const commentRoutes = express.Router();

//POST/api/v1/comments
commentRoutes.post("/", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "comment created",
    });
  } catch (error) {
    res.json(error);
  }
});

//GET/api/v1/comments/:id
commentRoutes.get("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "Post comments in route",
    });
  } catch (error) {
    res.json(error);
  }
});

//DELETE/api/v1/comments/:id
commentRoutes.delete("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "comment deleted",
    });
  } catch (error) {
    res.json(error);
  }
});

//PUT/api/v1/comments/:id
commentRoutes.put("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "comment updated in route",
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = commentRoutes;
