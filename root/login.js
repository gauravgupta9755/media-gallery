const express = require('express');
const app = require('./register');
app.use(express.json());
const  bcrypt= require("bcrypt");


const User = require('../conn/modal');

app.post("/login", async (req, res) => {

  const data = req.body;
  var userdata;
  try{
  userdata= await User.find({email:data.email});
  }
  catch(e){
         res.json({
          status:false,
          data:{}
        })
  }
  

  if(userdata.length!=0){
    const hashpassword= await bcrypt.compare(data.password,userdata[0].password);

    if(hashpassword) res.json({
      status:true,
      data: userdata[0]
    })
    else{
      res.json({
        status:false,
        data:{}
      })
    }
  }
  else{
    res.json({
      status:false,
      data:{}
    })
  }


  // validation -------------data--------------










  //  sava -----------data--------------

})

module.exports = app;