const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    walletAddress: {type: String, required: true, unique: true},
    walletType: {type: String, required: true, enum: ['metamask', 'phantom']},
    nonce: {type: Number, default: Math.floor(Math.random() * 1000000)}
})

const User = mongoose.model("User", UserSchema);

module.exports = User;