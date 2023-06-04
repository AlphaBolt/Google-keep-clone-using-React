// server/routes/notes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/note');

// Create a new note
router.post('/', (req, res) => {
  const { title, content, keyForSort } = req.body;
  
  // Create a new Note instance
  const newNote = new Note({
    title,
    content,
    keyForSort
    // Its data is being passed from createArea.jsx
  });

  // Save the new note to the database
  newNote.save()
    .then((savedNote) => {
      res.json(savedNote);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while saving the note' });
    });
});

// GET route to retrieve all notes
router.get('/', (req, res) => {
  Note.find().sort({keyForSort:-1})   // This will sort the notes in descending order of their dates created
    .then((notes) => {
      res.json(notes);
      console.log(notes);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while retrieving the notes' });
    });
});


// Delete a note
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log("id in notes: ",id);
  Note.findByIdAndRemove(id)
.then(function(){
    res.status(200).send('Note deleted successfully');
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error deleting note');
  });
});

module.exports = router;
