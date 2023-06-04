// server/models/note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  content: {
            type: String,
            required: [true, "Write some content to save!"]
          },
  keyForSort: Date
  // This is an entry for storing current date
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
