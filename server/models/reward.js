const { Schema } = require("mongoose");
var Schema = mongoose.Schema;
var rewardSchema = new Schema(
    {
        account: {type: Schema.Types.ObjectId, ref: 'Account'},
        icon: { type: Schema.Types.ObjectId, ref: 'Icon'},
        rewardName: String,
        rewardDesc: String,
        isBought: Boolean,
        price: Number

    } );
    module.exports = mongoose.model('reward', rewardSchema);