const mongoose = require("mongoose");
require("../Config/passportconfig");

require("../Model/userModel");
const passport = require("passport");
const jwt = require("jsonwebtoken");

var USERRegister = mongoose.model("userRegister");


//for registerSchema (create api)

module.exports.addData=(req,res)=>{
    var userRegData=new USERRegister({
        name:req.body.name,
        email:req.body.email,
        contact:req.body.contact,
        password:req.body.password
    });

    userRegData.save().then((documents)=>{
        return res.status(200).json({
            success:true,
            message:'New user has been added',
            data:documents
        })
    })
    .catch((err)=>{
        return res.status(401).json({
            success:false,
            message:'Error in adding data',
            error:err.message
        })
    })
}
//now going to create its path inside the Routes/userRoutes

//updated data by id(update api)

module.exports.updated=(req,res)=>{
    USERRegister.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true})
    .then((documents)=>{
        return res.status(200).json({
            success:true,
            message:'Data updated',
            data:documents
        })
    })
        .catch((err)=>{updatedData
            return res.status(401).json({
                success:false,
                message:'Error in updating data',
                error:err.message
            })
    })

}

//deleted data by id(delete api)

module.exports.delete=(req,res)=>{
    USERRegister.findByIdAndDelete({_id:req.params.id})
    .then((documents)=>{
        return res.status(200).json({
            success:true,
            message:'Data deleted',
            data:documents
        })
    })
        .catch((err)=>{updatedData
            return res.status(401).json({
                success:false,
                message:'Error in deleting data',
                error:err.message
            })
    })

}

//to check authentication while login and will generate a token

module.exports.authenticate=(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err) return res.status(404).json(err);
        if(user) return res.status(200).json({
            "token":jwt.sign({_id:user._id},"SecretToken",{expiresIn:'20m'}),
            "user":user
        });
        if(info) return res.status(401).json(info);
    })(req,res,next)
}
 module.exports.userProfile=(req,res,next)=>{
     const id=req._id;
     USERRegister.find({_id:id}).then((documents)=>{
         return res.status(200).json({
             success:true,
             message:'user record found',
             data:_.pick(documents,['name'])
         })
     })
     .catch((err)=>{
         return res.status(401).json({
             sucess:false,
             message:'Error finding records',
             error:err.message
         })
     })
 }


