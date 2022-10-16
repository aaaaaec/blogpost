//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



//lodash
// Load the full build.
const _ = require('lodash');





let posts = [];


app.get("/",function(req,res){
  res.render("home",{startingContent: homeStartingContent, posts:posts} );
});



app.get("/about", function(req,res){
  res.render("about",{aboutContent: aboutContent} );
});



app.get("/contact", function(req,res){
  res.render("contact",{contactContent: contactContent} );
});

//client requesting for /compose
app.get("/compose", function(req,res){
  res.render("compose"); //render the page of compose.ejs
});
//server sending back /compose
app.post("/compose", function(req,res){
  //create a javascript object to pass in title and post
  const post = {title:req.body.postTitle, content:req.body.postBody};
  //add into array
  posts.push(post);
  //redirect to home page
  res.redirect("/");
});


//dynamic website for exmaple if day-1 is logged, will be printed in console. http://localhost:3000/posts/day-1
app.get("/posts/:postName",function(req,res){
  const requestedTitle = _.lowerCase(req.params.postName);

  //for each element in array posts, check the title is equal to the requested title
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle){

      res.render("post",{
        title: post.title,
        content: post.content
      });

    }
  });

});









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
