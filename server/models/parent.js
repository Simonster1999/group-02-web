var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var parentSchema = new Schema({
    username            : String,
    password            : String
});

module.exports = mongoose.model('parents', parentSchema);