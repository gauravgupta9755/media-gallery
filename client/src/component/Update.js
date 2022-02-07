import React, { useState } from 'react';
import "./css/login.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
 import updataLoginData from "../action/index";
const Update = (props) => {


const navigate=useNavigate();
 // profile input tag state -----------------------------------------------------
 const [file, setFile] = useState("");
 const [filePath, setFilePath] = useState("./profile/profile.png");
 const loginState= useSelector((state)=>state.updateData);
  const dispatch=useDispatch();

// send profile image to backend--------------------------------------
  

 const onSubmiting = async (e) => {
   
e.preventDefault();

  const formData = new FormData();
  
  formData.append('file', file);

  formData.append("from","profile");
  
  formData.append("id",loginState._id);
  



  try {
    
    const res = await axios.post('/upload', formData, {
      header: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
   
    dispatch(updataLoginData(res.data.data));

    navigate("/userhome",{
      state:res.data.data[0]
    })
    
  
    
     

   
  
  }
  catch (err) {
    console.log(err);
    // if (err.respose.status === 500) {
    //   console.log("there was a problem with the server");
    // }
    // else {
    //   console.log(err.response.data.msg);
    // }

  }

}


  //  send data in backend -------------------------------------

  const send = async (e) => {
     
  
    const element = document.querySelectorAll('input');
    const about=document.querySelectorAll("textarea")[0].value;
    const updatedata = {
      username: element[0].value,
      password: element[2].value,
      confermpassword: element[3].value,
      about: about,
      name: element[1].value,
      email: element[5].value,
      gallery:element[4].value,
      preusername: loginState.username,
      profile:file

    }
    


    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(updatedata)
    }
    const res = await fetch("/update", options);
    const val = await res.json();
    if (val.status === true) {
      window.alert(val.errorType);
   await  onSubmiting(e);
    }
    else {
      window.alert(val.errorType);
    }
   
    // navigate("/login");

  }

  
  // click input element tag function undirectly by button -----------------------------

  const input = () => {

    document.getElementById("imgInp").click();
    
  }

  
 
  const onChange = (e) => {

    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
          var reader = new FileReader();
  
          reader.onload = function (er) {
           
             setFilePath(er.target.result);
             setFile(e.target.files[0]);
          }
  
          reader.readAsDataURL(e.target.files[0]);
      }


    
  

  }

// unselected the profile image---------------------------------------
  const defaultImage=()=>{
    setFilePath(loginState.profile);
    document.getElementById("imgInp").value="";
  }





  return (<>
    <div className="row g-3 needs-validation w-75 m-auto form-control-color p-5 shadow mt-5 overflow-hidden   mb-5 rounded d7  " novalidate >
    <div className="note bg-danger text-black text-center align-items-center justify-content-center "style={{fontSize:"1vw"}}>register with google default password is Password@username</div>
      <button className='btn bg-primary'onClick={()=>{props.countState("home")}}>Back</button>
      <div className="col-md-6">
        <label for="validationCustom01" className="form-label">Change username <br /> <span className="text-success fw-bold">{loginState.username}</span></label>
        <input type="text" className="form-control" id="validationCustom01" defaultValue={loginState.username} required></input>
        <div className="valid-feedback">
          Looks good!
        </div>
      </div>
      <div className="col-md-6">
        <label for="validationCustom04" className="form-label">Change name <br /><span className="text-success fw-bold">{loginState.name}</span></label>
        <input type="text" className="form-control" id="validationCustom01" defaultValue={loginState.name} required></input>
        <div className="invalid-feedback">
          please fill valid name
        </div>
      </div>
      <div className="col-md-6">
        <label for="validationCustom02" className="form-label">Change password <span className="text-success fw-bold"><br></br>***********</span></label>
        <input type="password" className="form-control" id="validationCustom02" defaultValue={loginState.password} required></input>
        <div className="valid-feedback">
          Looks good!
        </div>
      </div>
      <div className="col-md-6">
        <label for="validationCustomUsername" className="form-label" >conferm password <span className="text-success fw-bold"><br></br>**********</span></label>
        <div className="input-group has-validation">

          <input type="password" className="form-control" id="validationCustomUsername" defaultValue={loginState.password} aria-describedby="inputGroupPrepend" required></input>
          <div className="invalid-feedback">
            Please choose a username.
          </div>
        </div>
      </div>
     
     

      <div className="col-md-6">
        <label for="validationCustom04" className="form-label">Change Gallery Name<span className="text-success fw-bold overflow-hidden ">{loginState.gallery}</span></label>
        <input type="text" className="form-control" defaultValue={loginState.gallery} required></input>
        <div className="invalid-feedback">
          please fill valid gallery name 
        </div>
      </div>

      <div className="col-md-6">
        <label for="validationCustom04" className="form-label">Change email <span className="text-success fw-bold overflow-hidden ">{loginState.email}</span></label>
        <input type="email" className="form-control" defaultValue={loginState.email} required></input>
        <div className="invalid-feedback">
          please fill valid email
        </div>
      </div>
        
      <div className="col-md-12">
        <label for="validationCustom03" className="form-label">About <br></br><span className="text-success fw-bold overflow-hidden" >{loginState.about}</span></label>
        <textarea type="" className="form-control" id="validationCustom03" defaultValue={loginState.about} required></textarea>
        <div className="invalid-feedback">
          discribe yourself
        </div>
      </div>

      <div className="d-none" >
          
          <input type="file" onChange={onChange}   id="imgInp"></input>


      </div>


      <div className="col-md-6 text-center">
        <img src={loginState.profile} className="w-50 shadow-lg  mb-5 rounded " alt="" />
        
      </div>
        <div className="col-md-6 text-center">
        <img src={filePath} id="blah" className="w-50 shadow-lg  mb-5 rounded " alt="" />
        </div>

      <button className="btn btn-success" onClick={input}>Change profile</button>
      <button className="btn btn-success mt-1" onClick={defaultImage}>Remove The Selected Image</button>





      <div className="col-12 ">
        <button type="button"class="btn btn-danger "  onClick={send} >Update</button>
      </div>
    </div>

  </>)
}

export default Update;