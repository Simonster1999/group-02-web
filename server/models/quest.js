var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questSchema = new Schema({
    quest_name   : { type: String },
    money_bounty : { type: Number },
    is_completed : { type: Boolean },
    quest_desc   : { type: String },
    date         : { type: Date },
    parent       : { type: Schema.Types.ObjectId, ref: 'Parent'}
});

module.exports = mongoose.model('quests', questSchema);
