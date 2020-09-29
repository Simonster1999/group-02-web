var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var rewardSchema = new Schema({
    reward_name : {type: String, required: true},
    reward_desc : {type: String, default: ''},
    is_bought   : {type: Boolean, default: false},
    price       : {type: Number, required: true},
    parent      : {type: Schema.Types.ObjectId, ref: 'Parent', required: true},
    bought_by   : {type: Schema.Types.ObjectId, ref: 'Child'}
});

module.exports = mongoose.model('rewards', rewardSchema);
