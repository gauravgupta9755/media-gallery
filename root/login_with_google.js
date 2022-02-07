const express = require('express');
const app = require('./register');
const User = require('../conn/modal');
app.use(express.json());
const bcript=require("bcrypt");
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


app.post("/loginGoogle",async(req,res)=>{
    
   const val= await User.find({email:req.body.email})
   
   if(val.length!=0){
       res.json(val[0]);
   }
   else{

   const hashpassword= await bcript.hash(`Password@${req.body.username}`,10)
    const userData= new User({name:req.body.name,
                    email:req.body.email,
                    username:`${req.body.name}${await User.find().count()+1}`,
                    profile:req.body.imageUrl,
                    password: hashpassword,
                    ind: await User.find().count()
         })

         const result= await userData.save()
         featchfriend();
         
         if(result){
             res.json(result);
         }
   }
   
})