var app = require('express')();
var bodyParser = require('body-parser');
var book = require('./books');

app.use(bodyParser.json());

app.get('/books', book.findAll);
app.get('/books/:id', book.findById);

app.put('/books/:id', book.updateBook);
app.delete('/books/:id', book.deleteBook);

app.post('/books', book.addBook);

app.listen(3000);
console.log('Listening on port 3000...');
