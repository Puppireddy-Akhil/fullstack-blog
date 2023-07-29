const dotenv = require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const globalErrHandler = require("./middlewares/globalErrHandler");
const userRoutes = require("./routes/users/users");
const postRoutes = require("./routes/posts/post");
const commentRoutes = require("./routes/comments/comment");
const Post = require("./models/post/Post");
const dbconnect = require("./config/dbConnect.js");
const { truncatePost } = require("./utils/helpers");


const app = express();
// it contains all the properties that has given to app by express  console.log(app);

//helpers
app.locals.truncatePost = truncatePost;

//configure ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//middlewares
//-----------
app.use(express.json()); // to pass the incoming json data
app.use(express.urlencoded({ extended: true })); //to pass form data

//method override
app.use(methodOverride('_method'));
//session config
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URL,
      ttl: 24 * 60 * 60, // session expires in 1 day
    }),
  })
);
// save the login user into locals
app.use((req,res,next)=>{
  if(req.session.userAuth){
    res.locals.userAuth=req.session.userAuth;
  }else{
    res.locals.userAuth=null;
  }
  next();
})

//render home page
app.get("/",async (req, res) => { 
  try{
    const posts = await Post.find().populate("user");
    res.render("index", { posts } );
  }catch(error){
    res.render('index',{error:error.message})
  }
  
});
//users route
app.use("/api/v1/users", userRoutes);
//posts route
app.use("/api/v1/posts", postRoutes);
//comments
app.use("/api/v1/comments", commentRoutes);

//error handler middlewares
app.use(globalErrHandler);
//listen server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`server is running on PORT ${PORT}`));
