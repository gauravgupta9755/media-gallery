const mongoose = require('mongoose');
require('dotenv').config()


const db=process.env.DATA_BASE||"mongodb://localhost:27017/gallery"
const create_connection = async () => {
    try {
        await mongoose.connect(db);
        console.log("database connected");
    }
    catch(e) {
        console.log(e);
        console.log("database not connected");


    }
}
create_connection();


const userScema = mongoose.Schema({
    name: {
        type: String,
        require: true,

    },
    profile: {
        type: String,
        default: "./profile/profile.png"
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    about: {
        type: String,
        default: "Happy 😄 Day"
    },
    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true,

    },
    confarmPassword: {
        type: String,
        require: true
    },
    image: [{
        title:{
              type:String
        },
        path: {
            type: String,

        },
        status: {
            type: String,
        },
        favorit: {
            type: Boolean,
            default: false
        },
        date: {
            type: Date,
            default: new Date()
        }
    }],
    video: [{
        title:{
              type:String
        },
        path: {
            type: String,

        },
        status: {
            type: String,
        },
        favorit: {
            type: Boolean,
            default: false
        },
        date: {
            type: Date,
            default: new Date()
        }
    }],
    document: [{
        title:{
              type:String
        },
        path: {
            type: String,

        },
        status: {
            type: String,
        },
        favorit: {
            type: Boolean,
            default: false
        },
        date: {
            type: Date,
            default: new Date()
        }
    }],
   
   
   
    ind:{
        type:Number,
    
    },
    gallery:{
        type:String,
        default :"MyGallery"
    },
    like:[{
        type:String
    }]
    



});


const User = new mongoose.model("User", userScema);
module.exports = User;

