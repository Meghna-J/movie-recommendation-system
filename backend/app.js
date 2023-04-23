const express = require("express");
const request = require("request");
const hbs = require("hbs");
const path = require("path");
const app = require("express")();
const session = require("express-session");
const passport = require("./passport");
// const { mongoConnect } = require("./database/database");
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// app = express();
const PORT = 4000;
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.set("view engine", "hbs");
// app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/connect_mongodb_session_test",
  collection: "mySessions",
});

app.use(
  session({
    secret: "hdvjbqc qkbkjcboqbvkcqjnvqjvbaakvjahgohv",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
    store: store,
  })
);

const User = require("./database/User");

const cors = require("cors");
app.use(cors());

app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  // new user is getting saved in usersdb database in collection users 
  console.log("signup",email,password);
  let newUser = new User({ email: email, password: password });
  newUser.save();
  res.send("user created");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  // req.session.username = username;
  // req.session.loggedIn = true;
  // req.session.password = password;
  req.session.loggedIn = false;

  console.log(email, " ", password);
  User.find({ email: email }).then((user) => {
    // console.log(user);
    if (!user) {
      return res.send("notexist");
    }
  });
  User.find({ email: email, password: password }).then((user) => {
    // console.log(user);
    req.session.loggedIn = false;
    if (user.length===0) {
      return res.send("wrong");
    } 
    else {
      req.session.username = email;
      req.session.loggedIn = true;
      req.session.password = password;
      return res.send("correct");
      //redirect to /home
      // then /home ke route pe req.session.id se db pe req daaldi aur phir loggedin hai ya nhi dekhlia !!!
    }
  });
});

app.post('/logout',(req,res)=>{
  req.session.destroy();
  res.send('loggedOut');
})

app.get("/home", function (req, res) {
  console.log(req.session.loggedIn);
  return req.session.loggedIn;
  // if (req.session.loggedIn) {
    // request("http://127.0.0.1:5000", function (error, response, body) {
    //   console.error("error:", error);
    //   console.log("statusCode:", response && response.statusCode);
    //   res.send(body);
    // });
  // } else {
  //   res.redirect("/");
  // }
});

app.post("/recommendation", function (req, res) {
  const movie_name = req.body;
  console.log(movie_name.json);

  request.post(
    "http://127.0.0.1:5000/recommendation",
    { json: movie_name.json },
    (error, response, data) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(response.statusCode);
      res.send(data);
      console.log(data);
      return data;
      // // console.log(data[0]);
      // res.render('recommendation',{
      //     data:data,
      //     searched_movie:data[0]
      //   });
    }
  );
});

mongoose
  .connect("mongodb://127.0.0.1:27017/usersdb")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
