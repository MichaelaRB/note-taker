const express = require('express');
const path = require('path');
const fs = require('fs');
const noteData = require('./db/db');
const uniqid = require('uniqid');

const PORT = 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received to get reviews`);

    return res.status(200).json(noteData);
})

app.get('/api/notes/:id', (req, res) => {
    if (req.params.id) {
        console.info(`${req.method} request received to get a single note`);
        const noteId = req.params.id;
        for (let i = 0; i < noteData.length; i++) {
          const currentNote = noteData[i];
          if (currentNote.id === noteId) {
            res.status(200).json(currentNote);
            return;
          }
        }
        res.status(404).send('Note not found');
      } else {
        res.status(400).send('Note ID not provided');
      }
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note.`);

    const { title, text } = req.body;

    if (title && text) {
    const newNote = {
      title,
      text,
      id: uniqid(),
    };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedNotes = JSON.parse(data);
  
          parsedNotes.push(newNote);
  
          fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!'));
        }
      });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in saving notes');
  }
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
