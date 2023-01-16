const express = require('express');
const path = require('path');
const api = require('./routes/apiroutes');
const app = express();
const PORT = process.env.PORT || 3001;
const { clog } = require('./middleware/clog');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', api)
app.use(clog);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);