const express = require('express');
const app = require('./register');
app.use(express.json());
const validator = require('validator');
const User = require('../conn/modal');
const { set } = require('./register');
const bcrypt=require("bcrypt");

app.post("/updatecheck", async (req, res) => {


  const data = req.body;
  
  try{
    const userdata= await User.find({_id:data.id});
   const  hashpassword=await bcrypt.compare(data.password,userdata[0].password);
 if(hashpassword){
    res.json({
        status:"you can update",
        username:userdata.username
    })
}
else{
    res.json({
        status:"password is not matching",
        username:userdata.username
    })
}
  }
 

catch(e){
    res.json({
        status:"password is not matching",
       
    })
}
 

})




app.post("/update",async(req,res)=>{
    

    const data=req.body;
   
  if (!validator.isEmail(data.email)) {
    res.json({
      status:false,
      errorType: "Invalid Email"

    })
    return;
  }
  else if (!validator.isAlpha(validator.trim(data.gallery))) {
    res.json({
      status: false,
      errorType: "Invalid Gallery name (gallery name should be in one word"
    })
    return;

  }


  

 


   else if ( !validator.isStrongPassword(data.password)) {
    res.json({
      status: false,
      errorType: "Week password"

    })
    return;

  }
  else if (data.password != data.confermpassword) {
    res.json({
      status: false,
      errorType: "conferm password is not maching"
    })
    return;

  }
  
  try{
    const restlt = await User.updateOne({username:data.preusername},{
        $set:{
            name:data.name,
            password:data.password,
            email:data.email,
            about:data.about,
            username:data.username,
            gallery:data.gallery
   
        }
    })
    res.json({
        status: true,
        errorType: "updated"
      })
  }
  catch(e){
    res.json({
        status: false,
        errorType: "data is not updated"
      })
      return;
  }
 


})