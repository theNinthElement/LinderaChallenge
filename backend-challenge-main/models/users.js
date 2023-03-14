const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    birthdate: { type: Date, required: true },
    zipCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    createdOn: { type: Date, default: Date.now},
}, {
    timestamps: true
});

const User = mongoose.model("UserCollections", userSchema); 
module.exports = User;