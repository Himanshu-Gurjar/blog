const mongoose = require("mongoose");
const config   = require("config");
const bcrypt   = require("bcrypt");
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true
    }
}, {timestamps : true});

UserSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

const usersDB = mongoose.connection.useDb(config.get("databaseSettings.blog_posts"))
const User = usersDB.model(config.get("mongoCollections.users"), UserSchema);

module.exports = User;

