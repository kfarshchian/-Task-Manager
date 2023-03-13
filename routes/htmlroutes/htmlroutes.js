const fs = require('fs');
const notesEdit = require('express').Router();
const { v4: uuidv4 } = require('uuid');
//post the note route with uuid added.
notesEdit.post('/', (req, res) => {
    const {title, text} = req.body;
    const db = JSON.parse(fs.readFileSync('./db/db.json', (err) => { if (err) console.log(err)}));
    const item = {
        id: uuidv4(),
        title,
        text
    }
    db.push(item);
    fs.writeFileSync('./db/db.json', JSON.stringify(db, null, 2));
    res.json(item);
});
//get route
notesEdit.get('/', (req, res) => {
    const db = fs.readFileSync('./db/db.json', (err) => { if (err) console.log(err)});
    res.json(JSON.parse(db));
});
//delete route with uuid as guide for what to delete.
notesEdit.delete('/:id', (req, res) => {
    const db = JSON.parse(fs.readFileSync('./db/db.json', (err) => { if (err) console.log(err)}));
    const newDb = db.filter((note) => {
        return note.id !== req.params.id;
    });
    fs.writeFileSync('./db/db.json', JSON.stringify(newDb, null, 2));
    res.json({message: `Deleted ${req.params.id}`});
});

module.exports = notesEdit;