var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    username            : String,
    account_password    : String,
    balance             : Number,
    parent              : String
});

module.exports = mongoose.model('children', accountSchema);