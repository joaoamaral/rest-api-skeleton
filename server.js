var express = require('express'),
    book = require('./books');

var app = express();

app.get('/books', book.findAll);
app.get('/books/:id', book.findById);
app.post('/books', book.addBook);
app.put('/books/:id', book.updateBook);
app.delete('/books/:id', book.deleteBook);

app.listen(3000);
console.log('Listening on port 3000...');
