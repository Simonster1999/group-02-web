var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questSchema = new Schema({
    quest_Name: { type: String },
    money_Reward: { type: Number },
    is_Completed: { type: Boolean },
    quest_Desc: { type: String },
    date: { type: Date },
    Parent: { type: Schema.Types.ObjectId, ref: 'Parent'}
});

module.exports = mongoose.model('quests', questSchema);
