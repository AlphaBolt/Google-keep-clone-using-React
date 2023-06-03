import React, { useState, useEffect } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./createArea";
import Footer from "./Footer";
// eslint-disable-next-line
// import {createNote, readNotes} from "../server";

import axios from "axios";

function App(){

    const [notes, setNotes] = useState([]);

    function addNote(newNote) {
      // setNotes((prevNotes) => {
      //   // Adding to database: Change functionName and its methods
      //   // functionName.createNode(newNote.title, newNote.content);
      //   createNote(newNote.title, newNote.content);
      //   return [newNote, ...prevNotes];
      // });

      // chatGPT part:
      axios.post('http://localhost:5000/api/notes', newNote)
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
    }

    // This gets triggered whenever the page reloads:
    useEffect(() => {
      console.log("useEffect is triggered!");
      fetchData();
    }, []);

    function fetchData(){
      axios.get('http://localhost:5000/api/notes')
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    }

    function deleteNote(id) {
      // setNotes((prevNotes) => {
      //   return prevNotes.filter((noteItem, index) => {
      //     return index !== id;
      //   });
      // });

      // chatGPT part:
      console.log("id in App: ",id);
      const deleteId = "http://localhost:5000/api/notes/" + id;
      axios.delete(deleteId)
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
    }

    return (
      <div>
        <Header />
        <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={noteItem._id}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
        <Footer />
      </div>
    );
}

export default App;