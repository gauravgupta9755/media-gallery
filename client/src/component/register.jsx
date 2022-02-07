import React from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/register.css";
import "./css/login.css";
import { useNavigate } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import AnalogClock from 'analog-clock-react';
import { useDispatch } from 'react-redux';
 import updataLoginData from "../action/index";


const Register = () => {

  const dispatch= useDispatch();

  const navigate = useNavigate();


  const send = async () => {
    const data = {
      name: document.getElementById("name").value,

      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      conferm_password: document.getElementById("confarm_password").value
    }
    
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }
    const res = await fetch("/register", options);
    const val = await res.json();

    if (val.status === true && val.errorType === "registered") {
      navigate("/login");
    }
    else {
      window.alert(val.errorType);
    }

  }


  const onLoginFail = (res) => {
    console.log("login - fail")
  }
  const onLoginSuccess = async (res) => {
    console.log("logn - true");

    const result = await fetch("/loginGoogle", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(res.profileObj)
    });
    const data = await result.json()
    dispatch(updataLoginData(data));

    navigate('/userhome', {

      search: `?${data.username}`,
      state: data,
      status: "login"
    });


  }


  let options = {
    width: "300px",
    border: true,
    borderColor: "#2e2e2e",
    baseColor: "#17a2b8",
    centerColor: "#459cff",
    centerBorderColor: "#ffffff",
    handColors: {
      second: "#d81c7a",
      minute: "#ffffff",
      hour: "#ffffff"
    }
};


  return (
    <>
      <div className='d2  d7' >


        <span className='s1'>📸</span>
        <span className='s2'>Gallery</span>
        <div className='d3 d8 m-auto w-75' >
          <h1>Register</h1>

          <div className='d6'>

            Name-
            <input id="name" type='Name' name='Name' />
            <span className="alert-danger" style={{ fontSize: "10px" }}>Name should be atleast 5 character</span><br></br><br></br>
            Email-
            <input type='email' id="email" name='Email' />
            <span className="alert-danger " style={{ fontSize: "10px" }}>Email should be unique</span><br></br><br></br>

            Password-
            <input type='password' id="password" name='Password' />
            <span className="alert-danger " style={{ fontSize: "10px" }}>Password should be at least 8 character with number and special character</span><br></br><br></br>

            Confirm Password-
            <input type='password' id="confarm_password" name='confarm_password' />
            <button type="submit" onClick={send} className="btn">Ok</button>

          </div>

          <div className='d5 text-center align-items-center '>
            <h2>Create Your Collection Id</h2>
            <h4>continue with</h4>
            <GoogleLogin
              clientId="1046054081051-06rof3bes5kl7hq46cc8h0sdhn3vie2j.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={onLoginSuccess}
              onFailure={onLoginFail}
              cookiePolicy={'single_host_origin'}
            />
            {/* <FaGoogle className='icon'/><FaFacebook className='icon'/><FaLinkedin className='icon'/> */}
            <div className="watch w-auto m-auto text-center position-relative mt-4  " style={{left:"2vw"}}>
            <AnalogClock {...options} />
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Register;