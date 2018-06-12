var aardvarks = require("../controllers/aardvarks.js");
module.exports = function(app){
    app.get('/', function(req, res) {
        res.redirect('/aardvarks');
    });
    
    //index
    app.get('/aardvarks', function(req, res) {
        aardvarks.index(req, res);
    });
    
    //create
    app.post('/aardvarks', function(req,res) {
        aardvarks.create(req, res);
    });
    
    //new
    app.get('/aardvarks/new', function(req, res) {
        res.render('form');
    });
    
    //edit
    app.get('/aardvarks/edit/:id', function(req,res) {
        aardvarks.edit(req, res);
    });
    
    //destroy
    app.get('/aardvarks/destroy/:id', function(req,res) {
        aardvarks.destroy(req, res);
    });
    
    //show
    app.get('/aardvarks/:id', function(req, res) {
        aardvarks.show(req, res);
    });
    
    //update
    app.post('/aardvarks/:id', function(req,res) {
        aardvarks.update(req, res);
    });
}