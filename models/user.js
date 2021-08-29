const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email:{
        type:String,
        require:true,
        unique:true
    }
});
UserSchema.plugin(passportLocalMongoose) //dodat ce username, password, i jos mnoge metode i feature

module.exports=mongoose.model('User', UserSchema);