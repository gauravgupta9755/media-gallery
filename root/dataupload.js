const { json } = require('express');
const express = require('express');
const app = require('./register');
app.use(express.json());





const fileupload = require('express-fileupload');
const User = require('../conn/modal');




//    PROFILE CHANGE ------------------------------------------------------
//    PROFILE CHANGE ------------------------------------------------------
const changeProfile = async (name, id, res, file) => {


    const val = await User.updateOne({ _id: id }, { profile: `./profile/${name}` })
    if (val.acknowledged == true) {

        res.json({  msg: "profile uploaded", data: await User.find({ _id: id }) });
    }
    else {
        res.json({ msg: "profile not uploaded",data: await User.find({ _id: id })  });

    }

}

// data uploadeing---------------------------------------------------------
// data uploadeing---------------------------------------------------------

const uploaddata = async (name, type, data, res, file) => {
    // If type ======   VIDEO-------------------------------------
    // If type ======   VIDEO-------------------------------------
    if (file.mimetype == "video/mp4") {
        const val = await User.updateOne({ _id: data.id }, {
            $push: {
                video: {
                    path: `./uploads/${type}/${name}`,
                    status: data.status,
                    title: data.title

                }
            }
        })
        
        if (val.acknowledged == true) {
            res.json({ fileName: file.name, filePath: `/uploads/video/${file.name}`, msg: "uploaded", data: await User.find({ _id:data.id }) });
            return
        }

        else {
            res.json({ fileName: file.name, filePath: `/uploads/video/${file.name}`, msg: "notuploaded", });
             return
        }


    }

    // If type ======   IMAGE-------------------------------------
    // If type ======   IMAGE-------------------------------------
  else if (file.mimetype == "image/jpeg"||file.mimetype=="image/png") {
        const val = await User.updateOne({ _id: data.id }, {
            $push: {
                image: {
                    path: `./uploads/${type}/${name}`,
                    status: data.status,
                    title: data.title

                }
            }
        })
        
        if (val.acknowledged == true) {
            res.json({ fileName: file.name, filePath: `/uploads/image/${file.name}`, msg: "uploaded", data: await User.find({ _id:data.id }) });
            return
        }

        else {
            res.json({ fileName: file.name, filePath: `/uploads/image/${file.name}`, msg: "notuploaded" });
            return
        }


    }

    // If type ======   DOCUMENT-------------------------------------
    // If type ======   DOCUMENT-------------------------------------
    if (file.mimetype =="application/pdf") {
        const val = await User.updateOne({ _id: data.id }, {
            $push: {
                document: {
                    path: `./uploads/${type}/${name}`,
                    status: data.status,
                    title: data.title

                }
            }
        })
        
        if (val.acknowledged == true) {
            res.send({ fileName: file.name, filePath: `/uploads/document/${file.name}`, msg: "uploaded", data: await User.find({ _id:data.id }) });
            return
        }

        else {
            res.send({ fileName: file.name, filePath: `/uploads/document/${file.name}`, msg: "notuploaded" });
            return
        }

    }


}



// Post in /upload------------------------------------------------------------------
// Post in /upload------------------------------------------------------------------
app.use(fileupload());

app.post("/upload", async (req, res) => {
    if (req.files == null) {
           const data= await User.find({_id:req.body.id});
        res.send({ msg: "no file uploeaded",data:data[0]});
        
        return ;
    }

    const file = req.files.file;



    const path = __dirname.replace("server/root", "client/uploads");
    console.log(path);
   
     
    // PROFILE======   CHANGE-------------------------------------
    // PROFILE ======   CHANGE -------------------------------------
    if (req.body.from == "profile") {
       await file.mv(`${path}../../client/build/profile/${file.name}`, err => {
            if (err) {

                return res.status(500).send(err);
            }

            changeProfile(file.name, req.body.id, res, file);


        })
    }
    else {


        // If type ======   IMAGE-------------------------------------
        // If type ======   IMGAE-------------------------------------
        if (file.mimetype == "image/jpeg"||file.mimetype=="image/png") {
            await file.mv(`${path}../../client/build/uploads/image/${file.name}`, err => {
                if (err) {

                    return res.status(500).send(err);
                }
                else{
                    uploaddata(file.name, "image", req.body, res, file);
                }

            })
           


        }

        // If type ======   VIDEO-------------------------------------
        // If type ======   VIDEO-------------------------------------
        if (file.mimetype == "video/mp4") {
           await file.mv(`${path}../../client/build/uploads/video/${file.name}`, err => {
                if (err) {

                    return res.status(500).send(err);
                }

            })
            uploaddata(file.name, "video", req.body, res, file);
        }


        // If type ======   DOCUMENT-------------------------------------
        // If type ======   DOCUMENT-------------------------------------
        if (file.mimetype == "application/pdf") {
           await file.mv(`${path}../../client/build/uploads/document/${file.name}`, err => {
                if (err) {

                    return res.status(500).send(err);
                }

            })
            uploaddata(file.name, "document", req.body, res, file);
        }
    }


})



