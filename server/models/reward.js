const { Schema } = require("mongoose");
var Schema = mongoose.Schema;
var rewardSchema = new Schema(
    {
        account: {type: Schema.Types.ObjectId, ref: 'Account'},
        rewardName: String,
        rewardDesc: String,
        isBought: Boolean,
        price: Number

    } );
    module.exports = mongoose.model('reward', rewardSchema);