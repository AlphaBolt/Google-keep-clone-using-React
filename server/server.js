// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());

// Connect to MongoDB
main().catch(err => console.log(err));
     
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/keeperDB");
  console.log("Database connected!");
}

// Parse JSON request body
app.use(express.json());

// Routes
const notesRouter = require('./routes/notes');
app.use('/api/notes', notesRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
