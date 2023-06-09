import React, { useState, useEffect } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./createArea";
import Footer from "./Footer";
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

      // This code was for local host:
      // axios.post('https://localhost:5000/api/notes', newNote)

      // This is where the web service is now hosted in cyclic:
      axios.post('https://note-taking-app-api-a3ys.onrender.com/api/notes', newNote)
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

    async function fetchData(){

      // This code was for local host:
      // axios.get('https://localhost:5000/api/notes')

      // This is where the web service is now hosted in cyclic:
      axios.get('https://note-taking-app-api-a3ys.onrender.com/api/notes')
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

      // This code was for local host:
      // const deleteId = "https://localhost:5000/api/notes/" + id;

      // This is where the web service is now hosted in cyclic:
      const deleteId = "https://note-taking-app-api-a3ys.onrender.com/api/notes/" + id;
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