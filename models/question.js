var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    question : String,
    options: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Options"

      } ]
    
})

module.exports = mongoose.model('Questions', questionSchema);