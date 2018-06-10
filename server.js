var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

mongoose.connect('mongodb://localhost/basic_mongoose');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var aardvarkSchema = new mongoose.Schema({
    name: String,
    favorite_color: String
});
mongoose.model('Aardvark', aardvarkSchema);
var Aardvark = mongoose.model('Aardvark'); 

app.get('/', function(req, res) {
    res.redirect('/aardvarks');
});

//index
app.get('/aardvarks', function(req, res) {
    Aardvark.find({}, function(err, aardvarks) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {aardvarks: aardvarks});
        }
    });
});

//create
app.post('/aardvarks', function(req,res) {
    console.log(req.body);
    var aardvark = new Aardvark(req.body.body);
    aardvark.save(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

//new
app.get('/aardvarks/new', function(req, res) {
    res.render('form');
});

//edit
app.get('/aardvarks/edit/:id', function(req,res) {
    Aardvark.findById(req.params.id, function(err, aardvark) {
        console.log(req.params.id);
        if (err) {
            console.log(err);
        } else {
            res.render('edit', {aardvark: aardvark});
        }
    });
});

//destroy
app.get('/aardvarks/destroy/:id', function(req,res) {
    Aardvark.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

//show
app.get('/aardvarks/:id', function(req, res) {
    Aardvark.findById(req.params.id, function(err, aardvark) {
        if (err) {
            console.log(err);
        } else {
            res.render('show', {aardvark: aardvark});
        }
    });
});

//update
app.post('/aardvarks/:id', function(req,res) {
    var query = {_id: req.params.id}
    Aardvark.findOneAndUpdate(query, req.body.body, function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});