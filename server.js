const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const uniqid = require('uniqid');

const PORT = 3001;

const app = express();

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));

    console.info(`${req.method} request received to get the notes.html file.`);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));

    console.info(`${req.method} request received to get the index.html file.`);
});


app.get('/api/notes', (req, res) => {
    res.json(noteData);
    console.info(`${req.method} request received to get a note.`);
});

app.post('/api/notes', (req, res) => {
    res.json(`${req.method} request received to add a note.`);
    console.info(`${req.method} request received to add a note.`);
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
