const dotenv = require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const globalErrHandler = require("./middlewares/globalErrHandler");
const userRoutes = require("./routes/users/users");
const postRoutes = require("./routes/posts/post");
const commentRoutes = require("./routes/comments/comment");
const dbconnect = require("./config/dbConnect.js");

const app = express();
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
// it contains all the properties that has given to app by express  console.log(app);
//middlewares
//-----------
app.use(express.json()); // to pass the incoming json data
app.use(express.urlencoded({extended: true}));//to pass form data
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
//render home page
app.get('/',(req,res)=>{
  res.render('index.ejs');
})
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
