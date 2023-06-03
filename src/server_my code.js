import mongoose from "mongoose";
// import express from "express";
// const mongoose = require("mongoose");

// const app = express();

// Connecting to DB
function connectToDB(){
    main().catch(err => console.log(err));
     
    async function main() {
      await mongoose.connect("mongodb://127.0.0.1:27017/keeperDB");
      console.log("Database connected!");
    }
};



function createNote(title, content){
    
    const notesSchema = new mongoose.Schema({
        title: String,
        content: {
            type: String,
            required: [true, "Write some content to save!"]
        }
    });
    
    // Adding items into DB
    const Note = new mongoose.model("Note",notesSchema);

    console.log("createNode got called");
    const note = new Note({
        title: title,
        content: content
    });
    
    console.log(note);
    
    note.save().then(function(){
        console.log(note);
      })
      .catch(function(err){
        console.log(err);
      });
    
}

function readNotes(){
    // return something
}


export {createNote, readNotes};

