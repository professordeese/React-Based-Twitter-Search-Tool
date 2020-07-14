// (c) 2020 Anthony S. Deese, Ph.D.
// www.AnthonyDeese.com
// youtube.com/c/AnthonyDeesePhD
// This code is licensed under MIT license.

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'reactApp/build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'reactApp/build', 'index.html'));
});

app.listen(8081);