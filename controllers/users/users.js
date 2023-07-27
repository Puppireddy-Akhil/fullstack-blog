const User = require("../../models/user/User");
const bcrypt = require("bcryptjs");
const appErr = require("../../utils/appErr");

const registerCtrl = async (req, res, next) => {
  try {
    //check if the user exists (email)
    const { fullname, email, password } = req.body;
    console.log(req.body);
    if (!fullname || !email || !password) {
      return next(appErr("All fields are required"));
    }
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appErr("User already Exist"));
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
    //redirect
    res.redirect('/api/v1/users/profile-page');
  } catch (error) {
    return next(appErr(error.message));
  }
};

const loginCtrl = async (req, res, next) => {
  try {
    //check if the user exists (email)
    const { email, password } = req.body;
    if (!email || !password) {
      return next(appErr("all fields are required"));
    }
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(appErr("invalid login credentials"));
    }
    //check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid) {
      return next(appErr("invalid login credentials"));
    }
    //save the user into session
    req.session.userAuth = userFound._id;
    console.log(req.session);
    //send the user details
    res.json({
      status: "Login success",
      data: userFound,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

const userDetailsCtrl = async (req, res) => {
  try {
    //get the userId from params
    const userId = req.params.id;
    //find the user
    const user = await User.findById(userId);
    if (!user) {
      return next(appErr("user not found"));
    }
    res.json({
      status: "success",
      msg: "User Details in controller",
      user: user,
    });
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
    res.json({
      status: "success",
      msg: "User profile in controller",
      data: user,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

const uploadProfilePhotoCtrl = async (req, res, next) => {
  try {
    console.log(req.file.path);
    //find the user to be updated
    const userId = req.session.userAuth;
    const userFound = await User.findById(userId);
    //check if user not found
    if (!userFound) {
      return next(appErr("user not found", 403));
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
    res.json({
      status: "success",
      msg: "User profile image uploaded",
      data: user,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

const uploadCoverImageCtrl = async (req, res, next) => {
  try {
    console.log(req.file.path);
    //find the user to be updated
    const userId = req.session.userAuth;
    const userFound = await User.findById(userId);
    //check if user not found
    if (!userFound) {
      return next(appErr("user not found", 403));
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
    res.json({
      status: "success",
      msg: "User cover image uploaded",
      data: user,
    });
  } catch (error) {
    return next(appErr(error.message));
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
        req.params.id,
        {
          password: passwordHashed,
        },
        {
          new: true,
        }
      );
      res.json({
        status: "success",
        msg: "User password updated",
        data: user,
      });
    } else {
      return next(appErr("provide the passwordfield to update the password"));
    }
  } catch (error) {
    return next(appErr(error.message));
  }
};

const updataUserCtrl = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;
    //check if email is not taken
    const emailTaken = await User.findOne({ email });
    if (email) {
      if (emailTaken) {
        return next(appErr("Email is taken", 400));
      }
    }
    //update the user
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        fullname,
        email,
      },
      {
        new: true, //to have the updated record
      }
    );
    res.json({
      status: "success",
      msg: "User update",
      data: user,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

const logoutCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "User logout",
    });
  } catch (error) {
    res.json(error);
  }
};

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
