//to connect with the mongodb we are creating this db.js file

const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/testprojectRudraDB",{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true})
.then(()=>{
    console.log("Database connected succesfully");
}).catch((err)=>{
    console.log("Error in connection with db"+err);
})