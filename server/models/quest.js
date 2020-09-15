var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questSchema = new Schema({
    quest_name   : { type: String, required: true },
    money_bounty : { type: Number, required: true },
    is_completed : { type: Boolean, default: false },
    quest_desc   : { type: String },
    date         : { type: Date, required: true },
    parent       : { type: Schema.Types.ObjectId, ref: 'Parent', required: true}
});

module.exports = mongoose.model('quests', questSchema);
