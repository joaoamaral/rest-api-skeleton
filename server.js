var express = require('express'),
    books = require('./books');

var app = express();

app.get('/books', books.findAll);
app.get('/books/:id', books.findById);

app.listen(3000);
console.log('Listening on port 3000...');
