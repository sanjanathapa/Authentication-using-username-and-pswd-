//creating this file to prepare a schema for adding restrictions

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name should not be left blank']
    },
    email:{
        type:String,
        unique:[true,'Email Already Exists']
    },
    contact:{
        type:String,
        maxlength:[10,'contact must be atleast 10 number long'],
        minlength:[10,'contact must be atleast 10 number long']
    },
    password:{
        type:String,
        required:[true,'password should not left empty'],
        minlength:[4,'Password should be greater than 4']
    },
    saltString:{type:String}

});
//now after creating this schema we are going to craete its method inside the controller/usercontroller

//now method for encrypting the password during login
userSchema.pre('save',function(next){
    bcrypt.genSalt(15,(err,salt)=>{
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password=hash,
            this.saltString=salt
            next();
        })
    })

});
//to decrypt the password
userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

mongoose.model("userRegister", userSchema)

