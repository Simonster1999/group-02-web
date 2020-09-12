var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var rewardSchema = new Schema({
    reward_name : {type: String, required: true},
    reward_desc : {type: String},
    is_bought   : {type: Boolean, default: false},
    price       : {type: Number, required: true},
    parent      : {type: Schema.Types.ObjectId, ref: 'Parent', required: true}
});

module.exports = mongoose.model('rewards', rewardSchema);
