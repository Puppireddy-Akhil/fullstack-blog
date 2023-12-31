const Post = require("../../models/post/Post");
const Comment = require("../../models/comment/Comment");
const User = require("../../models/user/User");
const appErr = require("../../utils/appErr");

  const createCommentCtrl = async (req, res,next) => {
    try {
      const {message }=req.body;
      //find the post
      const post = await Post.findById(req.params.id);
      //create comment
      const comment = await Comment.create({
        user:req.session.userAuth,
        message,
        post:post._id
      });
      //push the comment
      post.comments.push(comment._id);
      //find the user
      const user = await User.findById(req.session.userAuth);
      //push the comment into the user
      user.comments.push(comment._id);
      //disable validation
      //save
      await post.save({validateBeforeSave:false});
      await user.save({validateBeforeSave:false});
      res.redirect(`/api/v1/posts/${post._id}`)
    } catch (error) {
      return next(appErr(error.message));
    }
  }
  
  const commentDetailsCtrl = async (req, res,next) => {
    try {
      const comment =await Comment.findById(req.params.id);
      res.render("comments/updateComment",{
        comment,
        error:"",
        
      })
    } catch (error) {
      res.render("comments/updateComment",{
        error:error.message,
      })
    }
  }

  const deleteCommentCtrl = async (req, res,next) => {
    try {
      //find the comment
      const comment =await Comment.findById(req.params.id);
      //check if this user has created the comment
      if(comment.user.toString()!==req.session.userAuth.toString()){ //conversion of object to string
        return next(appErr("you are not allowed to delete this comment",403));
      }
      //delete post
      await Comment.findByIdAndDelete(req.params.id);
      res.redirect(`/api/v1/posts/${req.query.postId}`)
    } catch (error) {
      return next(appErr(error.message));
    }
  }

  const updateCommentCtrl = async (req, res,next) => {
    try {
      //find the post
      const comment =await Comment.findById(req.params.id);
      if(!comment){
        return next(appErr("comment not found"));
      }
      //check if this user has created the comment
      if(comment.user.toString()!==req.session.userAuth.toString()){ //conversion of object to string
        return next(appErr("you are not allowed to update this comment",403));
      }
      //check if the comment is empty
      if(!req.body.message){
        return next(appErr("provide the comment to update the comment"))
      }
      //update comment
      const commentUpdated = await Comment.findByIdAndUpdate(req.params.id,{
        message:req.body.message,
      },
      {
        new:true,
      });
      //redirect
      res.redirect(`/api/v1/posts/${req.query.postId}`)
    } catch (error) {
      return next(appErr(error.message));
    }
  }

module.exports={
    createCommentCtrl,
    commentDetailsCtrl,
    deleteCommentCtrl,
    updateCommentCtrl,
}