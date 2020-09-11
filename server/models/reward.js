var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var rewardSchema = new Schema({
    reward_name : String,
    reward_desc : String,
    is_bought   : Boolean,
    price       : Number,
    parent      : {type: Schema.Types.ObjectId, ref: 'Parent'}
});

module.exports = mongoose.model('rewards', rewardSchema);
