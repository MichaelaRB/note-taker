const express = require('express');
const noteData = require('./db/notes.json');

const PORT = 3001;

const app = express();

app.use(express.static('public'));

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
