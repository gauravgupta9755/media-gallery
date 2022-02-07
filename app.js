const express = require('express');
const mongoose = require('mongoose');
const app = require('./root/register');
app.use(express.json());
require('./root/register.js');
require("./root/login.js")
require("./root/dataupload");
require("./root/update");
require("./root/login_with_google");
require("./root/quary");

const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log("connection successful wiht 5000");
})


if(process.env.NODE_ENV=="production"){
  app.use(express.static("client/build"));
}

  
  app.use("/",express.static("client/build"));


const path=require("path");
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


app.get("/home",(req,res)=>{
  res.json({key:"hello"});
});

module.exports=app;