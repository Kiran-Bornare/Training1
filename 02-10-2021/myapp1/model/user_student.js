var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    stud_name : String,
    stud_mobile : Number,
    stud_age: Number,
    stud_branch: String,
    stud_per: Number,
    
    
    
});

module.exports = mongoose.model('stud',myschema);