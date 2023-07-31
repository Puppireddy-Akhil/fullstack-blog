const User = require("../../models/user/User");
const Post = require("../../models/post/Post");
const appErr = require("../../utils/appErr");

const createPostCtrl = async (req, res, next) => {
  try {
    const { title, description, category, image, user } = req.body;
    if (!title || !description || !category || !req.file) {
      return res.render("posts/addPost", {
        error: "All  fields are required",
      });
    }
    //find the user
    const userId = req.session.userAuth;
    const userFound = await User.findById(userId);
    //create the post
    const postCreated = await Post.create({
      title,
      description,
      category,
      user: userFound._id,
      image: req.file.path,
    });
    //push the post created into the array of user's posts
    userFound.posts.push(postCreated._id);
    //resave the user
    await userFound.save();

    res.redirect("/");
  } catch (error) {
    return res.render("posts/addPost", {
      error: error.message,
    });
  }
};

const fetchPostCtrl = async (req, res, next) => {
  try {
    //get the id from params
    const id = req.params.id;
    //find the post
    const post = await Post.findById(id).populate({
      path:"comments",
      populate:{
        path:"user",
      }
    }).populate("user");
    res.render('posts/postDetails',{
      post,
      error:""})
  } catch (error) {
    return next(appErr(error.message));
  }
};

const fetchPostsCtrl = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("comments").populate("user");
    res.json({
      status: "success",
      msg: "Posts list",
      data: posts,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

const deletePostCtrl = async (req, res, next) => {
  try {
    //find the post
    const post = await Post.findById(req.params.id);
    //check if this user has created the post
    if (post.user.toString() !== req.session.userAuth.toString()) {
     return res.render('posts/postDetails',{
      post,
      error:"you are not allowed to delete this post"
     })
    }
    //delete post
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    return res.render('posts/postDetails',{
      post,
      error:error.message,
     })
  }
};

const updatePostCtrl = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;
    //find the post
    const post = await Post.findById(req.params.id);
    //check if this user has created the post
    if (post.user.toString() !== req.session.userAuth.toString()) {
      return res.render('posts/updatePost',{
        post,
        error:"You are not authorized to update this post",
       })
    }
    if (!(title && description && category)) {
      return res.render('posts/updatePost',{
        post,
        error:"Provide all fields..",
       })
    }
    
    //update post
    if(req.file){
      const postUpdated = await Post.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          category,
          image: req.file.path,
        },
        {
          new: true,
        }
      );
    }else{
      const postUpdated = await Post.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          category,
        },
        {
          new: true,
        }
      );
    }
    //redirect
    res.redirect(`/api/v1/posts/${req.params.id}`)///api/v1/users/profile-page
  } catch (error) {
    return res.render('posts/updatePost',{
      post,
      error:"Provide all fields..",
     })
  }
};

module.exports = {
  createPostCtrl,
  fetchPostCtrl,
  fetchPostsCtrl,
  deletePostCtrl,
  updatePostCtrl,
};
