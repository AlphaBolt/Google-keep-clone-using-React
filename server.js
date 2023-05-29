const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// Connecting to DB
main().catch(err => console.log(err));
 
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/keeperDB");
  console.log("Database connected!");
}

const notesSchema = new mongoose.Schema({
    title: String,
    content: {
        type: String,
        required: true
    },
});

// Adding items into DB
const Note = new mongoose.model("Note",notesSchema);

app.get("/", function(req,res){
    res.sendFile("../public/index.html");
});



app.listen(3000,function(){
    console.log("Server started on port 3000");
});

