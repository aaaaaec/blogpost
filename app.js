//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
//add mongoose
const mongoose = require("mongoose");
//lodash
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Daily Journal created for you to write down your thoughts and feelings. Connected to localhost and not published to any server";
const contactContent = "GitHub: @aaaaaec";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//connect a mongodb and to todolistDB database
mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true
});

const postSchema = {
 title: String,
 content: String
};
const Post = mongoose.model("Post", postSchema);


app.get("/",function(req,res){
  Post.find({}, function(err, posts){
   res.render("home", {
     startingContent: homeStartingContent,
     posts: posts
     });
 })
});

//client requesting for /compose
app.get("/compose", function(req,res){
  res.render("compose"); //render the page of compose.ejs
});


//server sending back /compose
app.post("/compose", function(req,res){
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  //save the user's composed post and if there's no error, redirect to home page
  post.save(function(err){
    if(!err){
      //redirect to home page
      res.redirect("/");
    }
  });
});


//dynamic website for exmaple if day-1 is logged, will be printed in console. http://localhost:3000/posts/day-1
app.get("/posts/:postId",function(req,res){
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});




app.get("/about", function(req,res){
  res.render("about",{aboutContent: aboutContent} );
});

app.get("/contact", function(req,res){
  res.render("contact",{contactContent: contactContent} );
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
