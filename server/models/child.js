var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    username         : String,
    password         : String,
    balance          : Number,
    parent           : { type: Schema.Types.ObjectId, ref: 'Parent'},
    completed_quests : [{type: Schema.Types.ObjectId, ref: 'Quest'}],
    bought_rewards   : [{type: Schema.Types.ObjectId, ref: 'Reward'}]
});

module.exports = mongoose.model('children', accountSchema);
