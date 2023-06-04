import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
    const [isExpanded, setExpanded] = useState(false);

    //Creating object:
    const[note, setNote] = useState({
        title: "",
        content: ""
    });

    function expand() {
      setExpanded(true);
    }

    function handleChange(event) {
        const { name , value } = event.target;

        setNote(prevNote => {
            return{
                ...prevNote,
                [name]: value,
                keyForSort: Date.now()
                // We add the above line so that the DB has one more value which stores current date
            };
        }); 
    }

    function submitNote(event){
      event.preventDefault();

      // Adding this to tell the user that their content is empty:
      if (!note.content) {
        alert("Please enter some content.");
        return;
      }

      props.onAdd(note);
      setNote({
        title: "",
        content: "",
      });
    }

    return (
      <div>
        <form className="create-note">
          {isExpanded && (
            <input
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Title"
            />
          )}
          <textarea
            name="content"
            onClick={expand}
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows={isExpanded ? 3 : 1}
          />
          <Zoom in={isExpanded}>
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Zoom>
        </form>
      </div>
    );
}

export default CreateArea;
