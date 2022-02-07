import React from 'react';
import "./css/login.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'
import UserHome from './user_home';
import GoogleLogin from 'react-google-login';
import {useDispatch } from 'react-redux';
 import updataLoginData from "../action/index";



const Login = () => {
const dispatch= useDispatch();
    document.body.click();

    const count={};
  

    const navigate = useNavigate();





    const send = async () => {
        // window.alert("cliced");
        const login_data = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }
        const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(login_data)
        })
        const data = await res.json()
        if (data.status === true) {

            dispatch(updataLoginData(data.data));
          
               
                navigate('/userhome', {

                    search: `?${data.data.username}`,
                   
                    status: "login"
                });
            
           

            // setCount(data);


        }
        else {
            window.alert('Incorrect Credential');
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
           
            status: "login"
        });


    }




    if (Object.keys(count).length === 0) {

        return (
            <>

                <script src="https://apis.google.com/js/platform.js" async defer></script>
                <div className='d2 d7'>


                    <span className='s1'>📸</span>
                    <span className='s2'>Gallery</span>
                    <div className='d3 d8 w-75 m-auto' >
                        <h1>Login</h1>
                        <div className='d6'>
                            Email-
                            <input type='email' id="email" name='Email' />
                            Password-
                            <input type='password' id="password" name='Password' />
                            <button id="btn" onClick={send}>Ok</button>
                        </div>
                        <div className='d5'>
                            <h2>Welcome In Your Collection</h2>
                            <h4>login with</h4>

                            <GoogleLogin
                                clientId="1046054081051-06rof3bes5kl7hq46cc8h0sdhn3vie2j.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={onLoginSuccess}
                                onFailure={onLoginFail}
                                cookiePolicy={'single_host_origin'}
                            />

                            {/* <div className="g-signin2" data-onsuccess={onSignIn} > <button type="submit" className="text-primary btn fs-4"><FaGoogle/></button></div> */}
                            {/* <FaFacebook className='icon'/>
                            <FaLinkedin className='icon'/> */}
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else {
        return (<><UserHome data={count}></UserHome> </>)
    }
}
export default Login;