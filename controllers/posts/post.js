 const User = require("../../models/user/User");
 const Post = require("../../models/post/Post");
const appErr = require("../../utils/appErr");

const createPostCtrl = async (req, res,next) => {
    try {
      const { title, description, category, image, user } = req.body;
      if(!title||!description||!category||!req.file){
        return next(appErr("all the fields are required"))
      }
      //find the user
      const userId = req.session.userAuth;
      const userFound = await User.findById(userId);
      //create the post
      const postCreated =await Post.create({
        title,
        description,
        category,
        user:userFound._id,
        image:req.file.path,
      });
      //push the post created into the array of user's posts
      userFound.posts.push(postCreated._id);
      //resave the user
      await userFound.save();
      
      res.json({
        status: "success",
        msg: "Post created",
        post:postCreated,
        user:userFound,
      });
    } catch (error) {
      return next(appErr(error.message));
    }
  }

const fetchPostCtrl = async (req, res,next) => {
    try {
      //get the id from params
      const id=req.params.id;
      //find the post
      const post = await Post.findById(id);
      res.json({
        status: "success",
        msg: "Post details",
        data:post,
      });
    } catch (error) {
      return next(appErr(error.message));
    }
  }

const fetchPostsCtrl = async (req, res,next) => {
    try {
      const posts = await Post.find();
      res.json({
        status: "success",
        msg: "Posts list",
        data:posts,
      });
    } catch (error) {
      return next(appErr(error.message));
    }
  }

const deletePostCtrl = async (req, res,next) => {
    try {
      //find the post
      const post =await Post.findById(req.params.id);
      //check if this user has created the post
      if(post.user.toString()!==req.session.userAuth.toString()){ //conversion of object to string
        return next(appErr("you are not allowed to delete this post",403));
      }
      //delete post
      await Post.findByIdAndDelete(req.params.id);
      res.json({
        status: "success",
        msg: "Post has been deleted successfully",
      });
    } catch (error) {
      return next(appErr(error.message));
    }
  }

const updatePostCtrl = async (req, res,next) => {
  try {
    const { title, description, category } = req.body;
      if(!(title||description||category||req.file)){
        return next(appErr("all the fields are required"))
      }
    //find the post
    const post =await Post.findById(req.params.id);
    //check if this user has created the post
    if(post.user.toString()!==req.session.userAuth.toString()){ //conversion of object to string
      return next(appErr("you are not allowed to update this post",403));
    }
    //update post
    const postUpdated = await Post.findByIdAndUpdate(req.params.id,{
      title,
      description,
      category,
      image: req.file.path
    });
    res.json({
      status: "success",
      msg: "Post updated",
      postUpdated,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
}

module.exports={
  createPostCtrl,
  fetchPostCtrl,
  fetchPostsCtrl,
  deletePostCtrl,
  updatePostCtrl,
}