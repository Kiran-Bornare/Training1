var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema1 = new Schema({
   
    email : String,
    password : String,
    file : String,

});

module.exports = mongoose.model('signup', myschema1);