import React, { useState,useEffect } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/upload.css';
import axios from 'axios'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector,useDispatch } from 'react-redux';
 import updataLoginData from "../action/index";
const Upload = (props) => {
  const loginState= useSelector((state)=>state.updateData);
  const dispatch=useDispatch();
  const [file, setfile] = useState({});
  const [filename, setFileName] = useState("choose file");
  const uploadFile ={};
  const [fileData,setFileData]=useState({
    status:"private",
    title:""
  });
  const location = useLocation();
  const navigate = useNavigate();

  
useEffect(() => {
  if(location.state&&location.state.name!=="Name"){
    dispatch(updataLoginData(location.state));
  }
 

}, []);
 

  const submit = async (e) => {
    
  
    e.preventDefault();
    
    if (loginState.name==="Name") {
      window.alert("you are not login: 😆");
      navigate("/login");
     return false;
    }

    const formData = new FormData();
    if(file.file){
    
      formData.append('file', file.file);
      formData.append("form","upload");
      formData.append("status",fileData.status);
      formData.append("title",fileData.title)
      formData.append("id",loginState._id)
    }
    
      
    else{
      alert("please choose the file");
      return false;
    }
    
    try {
     
      const res = await axios.post('/upload', formData, {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
    
      if(res){
        
        alert(`uploaded successfull:    fileName:  ${filename}`);
        
        dispatch(updataLoginData(res.data.data[0]));
        navigate("/upload",{
          state:res.data.data[0],
          usename:res.data.data[0].username,
          status: "login" 
   
        });
        
      }
      else{
        alert("not uploaded");
      }
    }
    catch (err) {
      if (err.respose.status === 500) {
        alert("there was a problem with the server");
      }
      else {
         alert(err.response.data.msg);
      }

    }
    

  }


  const onChange = (e) => {
    if(e.target.files){
      setfile({ file: e.target.files[0] });
      setFileName(e.target.files[0].name);
    }
    else{
      setFileData({
        status: e.target.type==="radio"?e.target.value:fileData.status,
        title: e.target.type==="text"?e.target.value:fileData.title
      })
    }
    
     

  }



  
   

  return (<>

    <div  className=" upload_contenar  container align-items-center justify-content-center shadow-lg  mb-5 bg-danger rounded ">
      <div method="POST" id="prospects_form" >
        <div className="row mb-3">
          <label for="inputEmail3" className="col-sm-2 col-form-label">Title</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inputEmail3" placeholder="Enter The Title Of File" onChange={onChange}></input>
          </div>
        </div>
        <div className="row mb-3">
          <label for="inputPassword3" className="col-sm-2 col-form-label">File</label>
          <div className="col-sm-10">
            <input type="file" className="form-control" id="inputfile" placeholder="Select The File" onChange={onChange}></input>
            <p>{filename}</p>
          </div>
        </div>
       
        <fieldset className="row mb-3">
          <legend className="col-form-label col-sm-2 pt-0">Status</legend>
          <div className="col-sm-10">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="gridRadios"  value="private"  onChange={onChange}></input>
              <label className="form-check-label" >
                Private
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="gridRadios" value="public" onChange={onChange}></input>
              <label className="form-check-label"  onChange={onChange}>
                Public
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="gridRadios"  value="protected" onChange={onChange}></input>
              <label className="form-check-label" >
                Protected
              </label>
            </div>

          </div>
        </fieldset>
        <div className="check_box row mb-3" >
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck1"></input>
              <label className="form-check-label" for="gridCheck1">
                Example checkbox
              </label>
            </div>
          </div>  
        </div>
      
        <button type="button"onClick={submit}  id="button1"  className="btn btn-primary" placeholder="Uplooad" >Upload</button>
       
      </div>
      {uploadFile ? <div className="row mt-5">
        <div className="col-md-6">
          <h3 className="text-center">{uploadFile.filePath}</h3>
          <img className="m-auto w-25" src={uploadFile.filePath} style={{ widows: "50%" }} alt="" />
        </div>
      </div> : null}
    </div>
  </>)
}

export default Upload;