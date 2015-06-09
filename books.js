var mongo = require('mongodb');
var Server = mongo.Server,
  Db = mongo.Db,
  BSON = mongo.BSONPure,
  ObjectID = mongo.ObjectID;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('bookdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'bookdb' database");
        db.collection('books', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'books' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findAll = function(req, res) {
    db.collection('books', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addBook = function(req, res) {
  console.log("REQ")
  console.log(req)

    var book = req.body;
    console.log('Adding book: ' + JSON.stringify(book));

    db.collection('books', function(err, collection) {
        collection.insert(book, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.updateBook = function(req, res) {
  console.log("REQ")
  console.log(req)
    var id = req.params.id;
    var book = req.body;
    console.log('Updating book: ' + id);
    console.log(JSON.stringify(book));
    db.collection('books', function(err, collection) {
        collection.update({'_id':new ObjectID(id)}, book, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating book: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(book);
            }
        });
    });
}

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving book: ' + id);
    db.collection('books', function(err, collection) {
        collection.findOne({'_id':new ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.deleteBook = function(req, res) {
    var id = req.params.id;
    console.log('Deleting book: ' + id);
    db.collection('books', function(err, collection) {
        collection.remove({'_id':new ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var books = [

    {
        name: "The Future of the Mind: The Scientific Quest to Understand, Enhance, and Empower the Mind",
        published: "February 25, 2014",
        author: "Michio Kaku",
        cover: "future_of_the_mind.jpg"
    },
    {
        name: "Creativity, Inc.: Overcoming the Unseen Forces That Stand in the Way of True Inspiration",
        published: "April 8, 2014",
        author: "Amy Wallace and Edwin Catmull",
        cover: "creativity_inc.jpg"
    },
    {
        name: "Your Inner Fish: The amazing discovery of our 375-million-year-old ancestor",
        published: "January 2008",
        author: "Neil Shubin",
        cover: "your_inner_fish.jpg"
    },
    {
        name: "Eloquent JavaScript: A Modern Introduction to Programming",
        published: "December 14, 2014",
        author: "Marijn Haverbeke",
        cover: "eloquent_javascript.png"
    }
    ];

    db.collection('books', function(err, collection) {
        collection.insert(books, {safe:true}, function(err, result) {});
    });

};
