var mongoose = require('mongoose');
var Aardvark = mongoose.model('Aardvark'); 

module.exports = {
    index: function(req, res) {
        Aardvark.find({}, function(err, aardvarks) {
            if (err) {
                console.log(err);
            } else {
                res.render('index', {aardvarks: aardvarks});
            }
        });
    },
    create: function(req, res) {
        console.log(req.body);
        var aardvark = new Aardvark(req.body.body);
        aardvark.save(function(err) {
            if(err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        });
    },
    edit: function(req,res) {
        Aardvark.findById(req.params.id, function(err, aardvark) {
            console.log(req.params.id);
            if (err) {
                console.log(err);
            } else {
                res.render('edit', {aardvark: aardvark});
            }
        });
    },
    destroy: function(req,res) {
        Aardvark.findByIdAndRemove(req.params.id, function(err) {
            if(err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        });
    },
    show: function(req, res) {
        Aardvark.findById(req.params.id, function(err, aardvark) {
            if (err) {
                console.log(err);
            } else {
                res.render('show', {aardvark: aardvark});
            }
        });
    },
    update: function(req,res) {
        var query = {_id: req.params.id}
        Aardvark.findOneAndUpdate(query, req.body.body, function(err) {
            if(err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        });
    }


}