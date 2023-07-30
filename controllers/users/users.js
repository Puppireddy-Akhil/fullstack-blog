const User = require("../../models/user/User");
const bcrypt = require("bcryptjs");
const appErr = require("../../utils/appErr");

const registerCtrl = async (req, res, next) => {
  try {
    //check if the user exists (email)
    const { fullname, email, password } = req.body;
    //console.log(req.body);
    if (!fullname || !email || !password) {
      return res.render("users/register", {
        error: "All  fields are required",
      });
    }
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.render("users/register", {
        error: "Email is taken",
      });
    }
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);
    //create user with the given details
    const user = await User.create({
      fullname,
      email,
      password: passwordHashed,
    });
    req.session.userAuth = user._id;
    //redirect
    res.redirect("/api/v1/users/profile-page");
  } catch (error) {
    return next(appErr(error.message));
  }
};

const loginCtrl = async (req, res, next) => {
  try {
    //check if the user exists (email)
    const { email, password } = req.body;
    if ( !email || !password) {
      return res.render("users/login", {
        error: "All  fields are required",
      });
    }
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.render("users/login", {
        error: "invalid login credentials",
      })
   }
    //check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid) {
      return res.render("users/login", {
        error: "invalid login credentials",
      })
    }
    //save the user into session
    req.session.userAuth = userFound._id;
  
    //redirect
    res.redirect("/api/v1/users/profile-page");
  } catch (error) {
    return next(appErr(error.message));
  }
};

const userDetailsCtrl = async (req, res) => {
  try {
    //get the userId from params
    const userId = req.session.userAuth; 
    //find the user
    const user = await User.findById(userId);
    if (!user) {
      return next(appErr("user not found"));
    }
    res.render("users/updateUser",{
      user,
      error:"",
    })
  } catch (error) {
    return next(appErr(error.message));
  }
};

const profileCtrl = async (req, res) => {
  try {
    //get the login user
    const userID = req.session.userAuth;
    //find the user
    const user = await User.findById(userID)
      .populate("posts")
      .populate("comments");
    res.render('users/profile',{ user })
  } catch (error) {
    return next(appErr(error.message));
  }
};

const uploadProfilePhotoCtrl = async (req, res, next) => {
  try {
    //check if the file exists
    if(!req.file){
      res.render('users/uploadProfilePhoto',{
        error:"please upload image",
      })
    }
    //find the user to be updated
    const userId = req.session.userAuth;
    const userFound = await User.findById(userId);
    //check if user not found
    if (!userFound) {
      res.render('users/uploadProfilePhoto',{
        error:"User not found",
      })
    }
    //update profile photo
    const user = await User.findByIdAndUpdate(
      userId,
      {
        profileImage: req.file.path,
      },
      {
        new: true,
      }
    );
    res.redirect("/api/v1/users/profile-page")
  } catch (error) {
    res.render('users/uploadProfilePhoto',{
      error:error.message,
    })
  }
};

const uploadCoverImageCtrl = async (req, res, next) => {
  try {
    //check if the file exists
    if(!req.file){
      res.render('users/uploadCoverPhoto',{
        error:"please upload image",
      })
    }
    //find the user to be updated
    const userId = req.session.userAuth;
    const userFound = await User.findById(userId);
    //check if user not found
    if (!userFound) {
      res.render('users/uploadCoverPhoto',{
        error:"User not found",
      })
    }
    //update cover Image
    const user = await User.findByIdAndUpdate(
      userId,
      {
        coverImage: req.file.path,
      },
      {
        new: true,
      }
    );
    res.redirect("/api/v1/users/profile-page")
  } catch (error) {
    res.render('users/uploadProfilePhoto',{
      error:error.message,
    })
  }
};

const updatePasswordCtrl = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(password, salt);
      //update user
      const user = await User.findByIdAndUpdate(
        req.session.userAuth,
        {
          password: passwordHashed,
        },
        {
          new: true,
        }
      );
      res.redirect("/api/v1/users/profile-page")
    
    } else {
      res.render('users/updatePassword',{
        error:"provide the password",
      })
    }
  } catch (error) {
    res.render('users/updatePassword',{
      error:error.message,
    })
  }
};

const updateUserCtrl = async (req, res, next) => {
  try {
    const { fullname, email } = req.body;
    //check 
    if(!fullname||!email){
      res.render('users/updateUser',{
        error:"please provide details",
      })
    }
    //check if email is not taken
    const emailTaken = await User.findOne({ email });
    const user = await User.findById(req.session.userAuth);
    console.log(user.email);
    if (email!==user.email) {
      console.log("iam here")
      if (emailTaken) {
        console.log("iam here too")
        res.render('users/updateUser',{
          error:"Email is already taken",
          user,
        })
      }
    }
    //update the user
     await User.findByIdAndUpdate(
      req.session.userAuth,
      {
        fullname,
        email,
      },
      {
        new: true, //to have the updated record
      }
    );
    res.redirect("/api/v1/users/profile-page")
  } catch (error) {
    res.render('users/updateUser',{
      error:error.message,
      user:"",
    })
  }
};

const logoutCtrl = async (req, res) => {
  
    //destroy session
    req.session.destroy(()=>{
      res.redirect('/api/v1/users/login');
    })
  
};

module.exports = {
  registerCtrl,
  loginCtrl,
  userDetailsCtrl,
  profileCtrl,
  uploadProfilePhotoCtrl,
  uploadCoverImageCtrl,
  updatePasswordCtrl,
  updateUserCtrl,
  logoutCtrl,
};
