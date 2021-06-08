var express = require("express");
var myctrl = require("../Controller/userController");

var approute = express.Router();
var jwt = require("../Config/jwthelper");

approute.post("/userRegCreate", myctrl.addData);
approute.put("/updatedRecord/:id", myctrl.updated);
approute.delete("/deleteRecord/:id", myctrl.delete);
approute.post("/auth", myctrl.authenticate);
approute.get('/profile',jwt.verifyJwtToken,myctrl.userProfile);

module.exports=approute;
