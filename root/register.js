
const express = require('express');
const app = express();
app.use(express.json({ limit: '1mb' }));
const validator = require('validator');
const bcrypt=require("bcrypt");


// require("../conn/modal");
const User = require('../conn/modal');
const Friend = require('../conn/friend')



async function newreg(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    arr[i][arr.length] = 0
  }
  arr[arr.length] = Array(arr.length + 1).fill(0);


  await Friend.deleteOne(
    { _id: id } // specifies the document to delete
  )

  const friendData = new Friend({
    friendgraph: arr
  })
  await friendData.save()



}

const featchfriend = async () => {
  const friend = await Friend.find();


  if (friend.length != 0) {
    let arr = friend[0].friendgraph;
    newreg(arr, friend[0]._id);
  }
  else {
    const friendData = new Friend({
      friendgraph: [[0]]
    })
    await friendData.save()

  }


}


app.post("/register", async (req, res) => {
  
 
const data=req.body;

  // validation -------------data--------------

  if (!validator.isEmail(data.email)) {
    res.json({
      status:false,
      errorType: "Invalid Email"

    })
    return;
  }
  else if (isname(data.name)) {
    res.json({
      status: false,
      errorType: "Invalid Name"
    })
    return;

  }


  

  
else if(await User.find({email:data.email}).count()>0){
  res.json({
  status: false,
  errorType:" Email is already exists"

});
return ;
}

   else if ( !validator.isStrongPassword(data.password)) {
    res.json({
      status: false,
      errorType: "Week password"

    })
    return;

  }
  else if (data.password != data.conferm_password) {
    res.json({
      status: false,
      errorType: "conferm password is not maching"
    })
    return;

  }
  
  function isname(name){
    if(name==null||name=="")return true;
    if(name.length<4)return true
   
    
  }




  //  sava -----------data--------------
   
  const hashpassword= await bcrypt.hash(data.password,10);
  
  const Userdata = new User({
    name: validator.trim(data.name),
    username:`${validator.trim(data.name)}${await User.find().count()}`,
    email: data.email,
    password: hashpassword,
    conferm_password: data.conferm_password,
    about:data.about,
    ind:await User.find().count()
    
  })


   upload(Userdata,res);
   featchfriend();

  

});
async function upload(Userdata,res) {
  
    const res_from_database = await Userdata.save();
    if(res_from_database){
     
      res.json({
        status:true,
        errorType:"registered"
      })
    }
    else{
      res.json({
        status:false,
        errorType:"data is not saved please try again !"
      })
    }
   
  
  


}






module.exports = app;
