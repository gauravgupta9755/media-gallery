const mongoose = require('mongoose');


const friendSchema =mongoose.Schema({
    friendgraph:{
        type:[[Number]],
        default:[[0,0],[1,0]],
    }
})




const Friend= new mongoose.model("Friend",friendSchema);

module.exports =Friend;