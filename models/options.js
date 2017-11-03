var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var optionsSchema = new Schema({
    oValue: String,
    isCorrect: Boolean
})

module.exports = mongoose.model('Options', optionsSchema);