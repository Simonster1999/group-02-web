const { Schema } = require("mongoose");
var Schema = mongoose.Schema;
var rewardSchema = new Schema(
    {
        rewardName: String,
        rewardDesc: String,
        isBought: Boolean,
        price: Number

    } );
    module.exports = mongoose.model('reward', rewardSchema);