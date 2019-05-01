const express=require("express");
const app=express();

const fetch=require("node-fetch");

app.use(express.static("client"));
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json({extended:false}));


var fs=require("fs");
var data=fs.readFileSync("data.json");
var words=JSON.parse(data);
var blog=fs.readFileSync("blog.json");
var blogposts=JSON.parse(blog);


app.get("/words",async function(req,res){
  try{
    let number=req.query.number;
    let response=await fetch ("http://quotes.rest/qod.json?category="+number);

    let body=await response.text();
    res.send(body);

  } catch(error){
    alert("Another error:"+error);
  }
});

app.get("/pics",async function(req,res){
  try{
    let codeword=req.query.codeword;
    let response=await fetch("https://api.unsplash.com/search/photos?page=2&per_page=30&client_id=e4f296bad17704676c7810b41e4d73bbc43f8e4cb8053792b4213a427b268176&query="+codeword);

    if(response.ok){
      let body=await response.text();
      res.send(body);
    }
  } catch(error){
    alert("Another error:"+error);
  }
});

app.get("/save", async function(req,res){
  try{
    let url=req.query.links;
    let name=req.query.name;
    words[name]=url;
    var data=JSON.stringify(words, null,2);
    fs.writeFile("data.json",data,function(err){
      if (err) throw err;
    });
    res.send(data);
  } catch(error){
    alert("Another error:"+error);
  }
});

app.get("/populate", async function(req,res){
  var data=fs.readFileSync("data.json");
  var words=JSON.parse(data);

  res.send(words);

});

app.post("/blog", async function(req,res){
  try {
    let password=req.body.pass;
    let theme=req.body.theme;
    let text=req.body.text;

    if (password=="whatever"){
      blogposts[theme]=text;
      var blog=JSON.stringify(blogposts, null,2);
      fs.writeFile("blog.json",blog,function(err){
        if (err) throw err;
      });
      res.send(blog);
    } else{
      var err={"error_007":"The password is not valid!"};
      res.send(err);
    }
  } catch (error) {
    alert("Error");
  }
});

module.exports=app;
