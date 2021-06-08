const mongoose =  require("mongoose");

var passport=require('passport');
var localpassport=require('passport-local').Strategy;

require("../Model/userModel");
var userregisterModel = mongoose.model('userRegister');

passport.use(new localpassport({usernameField:'email'}, 
(username,password,done)=>{
    userregisterModel.findOne({email:username}, 
        (err,user)=>{
            if(err)
            return done(err);
            else if(!user)
            return done(null,false,{message:'email is not registered'})
            else if(!user.verifyPassword(password))
            return done(null,false,{message:'Password does not match',result:user.verifyPassword(password)});
            else
            return done(null,user);
        })
}))
