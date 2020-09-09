const { Schema } = require("mongoose");
var Schema = mongoose.Schema;
var iconSchema = new Schema(
    {
        iconName: String,
        imgAdr: String
    } );
    module.exports = mongoose.model('Icon', iconSchema);