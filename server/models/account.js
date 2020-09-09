var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    username            : String,
    account_password    : String,
    parent_password     : String,
    balance             : Number
});

module.exports = mongoose.model('account', accountSchema);