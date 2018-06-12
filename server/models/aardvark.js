var mongoose = require('mongoose');

var aardvarkSchema = new mongoose.Schema({
    name: String,
    favorite_color: String
});
mongoose.model('Aardvark', aardvarkSchema);