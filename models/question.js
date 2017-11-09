var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    question : String,
    options: [{
            oValue: String,
            isCorrect: Boolean

      } ]
    
})

module.exports = mongoose.model('Questions', questionSchema);