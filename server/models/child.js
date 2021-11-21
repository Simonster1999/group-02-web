var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var childSchema = new Schema({
    username : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    balance  : {type: Number, default: 0},
    parent   : {type: Schema.Types.ObjectId, ref: 'Parent', required: true}
});

module.exports = mongoose.model('children', childSchema);
