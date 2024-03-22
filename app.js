

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const date = require(__dirname + "/date.js");
const app = express();

var items = [];
let workItems=[];
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});
const itemsSchema = {
  name : String
};
const Item = mongoose.model("Item", itemsSchema);
const item1 = new Item({
  name : "welcome to your to do list"
});

const item2 = new Item({
  name : "Hit the + button to add a new item"
});

const item3 = new Item({
  name : "Hit the - button to delete an item"
});

const defaultItems = [item1 , item2, item3 ];

Item.insertMany(defaultItems , {
  if(err){
    console.log(err);
  }
});

app.get("/", function(req, res){
res.render("list",{listTitle:"Today", newlistitems: items});
}); 

app.post("/", function(req,res){
  let item =  req.body.newitem;
  if (req.body.list === "Work" ){

    workItems.push(item);
    res.redirect("/work");
  }else{
  items.push(item);
  res.redirect("/");
}
});

app.get("/work",function(req,res){
  res.render("list", {listTitle:"Work List", newlistitems : workItems});
});


/*app.post("/work",function(req,res){
  let item = req.body.newitem;
  workItems.push(item);
  res.redirect("/work");
});*/

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
