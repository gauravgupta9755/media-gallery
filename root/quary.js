const express = require('express');
const app = require('./register');
const User = require('../conn/modal');
let firiend = [10][10];
app.use(express.json());
const Friend = require('../conn/friend');


app.get('/publicdata', async (req, res) => {

  const temp = await User.find().select({ image: 1, video: 1, document: 1, _id: 0 });

  
  let image = [];
  let video = [];
  let document = [];
  for (let i = 0; i < temp.length; i++) {
    temp[i].image.forEach(element => {
      if (element.status == "public") {
        image.push(element);
      }
    });
    temp[i].video.forEach(element => {
      if (element.status == "public") {
        video.push(element)
      }
    });

    temp[i].document.forEach(element => {
      if (element.status == "public") {
        document.push(element);
      }
    })
  }

  const response = {
    image,
    video,
    document

  };

  

  res.end(JSON.stringify(response));

})



app.post("/users", async (req, res) => {


  const users = await User.find({ username: { $ne: req.body.username } }).select({ username: 1, profile: 1, ind: 1 });
  res.json(users);
})











app.post("/request", async (req, res) => {

  const val = req.body;
  const friend = await Friend.find();

  if (friend.length != 0) {
    const arr = friend[0].friendgraph;
  
    getfriend(arr, val.sender, res);
    // res.json(frienddata);
  }
})





app.post("/newrequest", async (req, res) => {
  const val = req.body;

  const friend = await Friend.find();

  if (friend) {
    const arr = friend[0].friendgraph;
    updatereq(parseInt(val.sender), val.resciver, arr);
    await Friend.deleteOne(
      { _id: friend[0].id } // specifies the document to delete

    )
    const friendData = new Friend({
      friendgraph: arr
    })
    await friendData.save()

    getfriend(arr, val.sender, res);

  }


})

async function getfriend(arr, sender, res) {
  const len = arr.length;
  const frienddata = {
    friend: [],
    request: [],
    friendrequest: [],
    invitefriend: []
  }

  for (let i = 0; i < len; i++) {
    if (i == sender) {
      continue;
    }
    
    if (arr[i][sender] == 1 && arr[sender][i] == 1) {
      const data = await User.find({ ind: i }).select({ username: 1, ind: 1, profile: 1,name:1,about:1 })
      frienddata.friend.push(data[0]);

    }
    else if (arr[i][sender] == 1 && arr[sender][i] == 0) {
      const data = await User.find({ ind: i }).select({ username: 1, ind: 1, profile: 1,name:1,about:1 })
      frienddata.friendrequest.push(data[0]);
    }
    else if (arr[i][sender] == 0 && arr[sender][i] == 1) {
      const data = await User.find({ ind: i }).select({ username: 1, ind: 1, profile: 1,name:1,about:1 });
      frienddata.request.push(data[0]);
    }
    else if (arr[i][sender] == 0 && arr[sender][i] == 0) {
      const data = await User.find({ ind: i }).select({ username: 1, ind: 1, profile: 1,name:1 ,about:1})
    
      frienddata.invitefriend.push(data[0]);
    }

  }


  res.json(frienddata)
  

}






function updatereq(s, r, arr) {

  if (arr[s][r] == 1) {
    arr[s][r] = 0;
  }
  else {
    arr[s][r] = 1;
  }

}





app.post("/delete", async (req, res) => {
  
  let val;
  if (req.body.typ == "image") {
    val = await User.updateOne({ "image._id": req.body.dataid }, { $pull: { "image": { _id: req.body.dataid } } });
  }
  if (req.body.typ == "document") {

    val = await User.updateOne({ "document._id": req.body.dataid }, { $pull: { "document": { _id: req.body.dataid } } });
  }
  if (req.body.typ == "video") {
    val = await User.updateOne({ "video._id": req.body.dataid }, { $pull: { "video": { _id: req.body.dataid } } });
  }
  if (val.acknowledged == true) {

    res.json({ status: "deleted", data: await User.find({ _id: req.body.user_id }) });
  }
  else {
    res.json({ status: "Not delete : 😲 some problem" })
  }
})



app.post("/updatestatus", async (req, res) => {

  let val;

  if (req.body.typ == "image") {
    val = await User.updateOne({ image: { $elemMatch: { _id: req.body.dataid } } }, { $set: { "image.$.status": req.body.status } });

  }
  if (req.body.typ == "video") {
    val = await User.updateOne({ video: { $elemMatch: { _id: req.body.dataid } } }, { $set: { "video.$.status": req.body.status } });

  }
  if (req.body.typ == "document") {
    val = await User.updateOne({ document: { $elemMatch: { _id: req.body.dataid } } }, { $set: { "document.$.status": req.body.status } });

  }
  if (val.acknowledged == true) {

    res.json({ status: "updated", data: await User.find({ _id: req.body.user_id }) });
  }
  else {
    res.json({ status: "Not updated : 😲 some problem" })
  }



})

app.post("/like", async (req, res) => {
  
   
   const val=await User.find({like:req.body.dataid,_id:req.body.user_id});
   console.log(req.body);
  if(val.length!=0){
   await User.updateOne({_id:req.body.user_id},{$pull: {like:{$all:[req.body.dataid]}}});
   res.json({ status: "updated", data: await User.find({ _id: req.body.user_id }) });
  }
  else{
    await User.updateOne( {_id:req.body.user_id},{$push: {like:req.body.dataid}});
    res.json({ status: "updated", data: await User.find({ _id: req.body.user_id }) });
  }

})

app.post("/friemdpublicdata", async (req, res) => {
  const data = await User.find({ _id: req.body.id },{image:{$elemMatch:{status:"public"}},video:{$elemMatch:{status:"public"}},document:{$elemMatch:{status:"public"}},username:1,name:1,about:1,profile:1})
  res.json(data[0]);
  
})

app.post("/frienddata", async (req, res) => {

  const data = await User.find({ _id: req.body.id },{image:{$elemMatch:{$or:[{status:"public"},{status:"protected"}]}},video:{$elemMatch:{$or:[{status:"public"},{status:"protected"}]}},document:{$elemMatch:{$or:[{status:"public"},{status:"protected"}]}},username:1,name:1,about:1,profile:1})
  res.json(data[0]);
  
})

app.post("/favorite", async (req, res) => {
  
  const data = await User.find({ _id: req.body.id },{like:1})
  let senddata={
    image:[],
    video:[],
    document:[]
  }
 
 let i=data[0].like.length;
 data[0].like.forEach( async (val)=>{
  
  // const result = await User.find({"image.$._id":val,"video.$_id":val,"document.$._id":val},{image:{ $elemMatch:{_id:val}},video:{$elemMatch:{_id:val}},document:{$elemMatch:{_id:val}},_id:0})
  const img = await User.find({"image._id":val},{image:1,image:{ $elemMatch:{_id:val}},_id:0});
  const doc = await User.find({"document._id":val},{document:1,document:{$elemMatch:{_id:val}},_id:0});
  const vid = await User.find({"video._id":val},{video:1,video:{$elemMatch:{_id:val}},_id:0});
  
  if(img.length){
    senddata.image.push(img[0].image[0]);
    i--;
  }if(doc.length){
    senddata.document.push(doc[0].document[0]);
    i--;
  }if(vid.length){
    senddata.video.push(vid[0].video[0]);
    i--;
  }
  
  if(i==0){
    res.json(senddata);
  }
  
   
 })
 
 if(i==0){
  res.json(senddata);
 }
 
 
 
})



app.post("/mydata", async (req, res) => {
  const data = await User.find({ _id: req.body.myid })
  res.json(data[0]);
})