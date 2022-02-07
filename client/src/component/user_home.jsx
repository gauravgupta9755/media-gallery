
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import MyImage from "../image/guillermo-ferla-kEEl9csCutg-unsplash.jpg";
import "./css/userhome.css";
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Update from './Update'
import Showdata from './showdata';
import { useNavigate } from 'react-router-dom'
import GoogleLogin from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux';
import updataLoginData from "../action/index";


const UserHome = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const checkStatus = "";
    const [count, setCount] = useState("home");
    const loginState = useSelector((state) => state.updateData);
    const dispatch = useDispatch();
    const [favorite, setFavorite] = useState({ image: [], video: [], document: [] });

    const getfavorite = async () => {


        const res = await fetch("/favorite", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ id: loginState._id })
        });
        const data = await res.json()
        console.log(data);
        setFavorite(data);

    }
    useEffect(() => {

        if (location.state !== null) {
            dispatch(updataLoginData(location.state));
        }
        // if(location.state.=="Name"){
        //     window.alert("please login");
        //     navigate("/login");
        // }    

        getfavorite();

    }, []);





    const userdata = loginState;


    // if (userdata.name == "Name") {

    //     window.alert("please login before");

    // }
    const onLoginFail = (res) => {

    }
    const onLoginSuccess = async (res) => {


        if (res.profileObj.email !== userdata.email) {
            window.alert("this is not you email");
        }
        else {
            const result = await fetch("/loginGoogle", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify(res.profileObj,)
            });
            const data = await result.json()
            setCount("checked");


        }
    }





    const checkpassword = async () => {


        const updatedata = {
            password: document.getElementById("Password").value,
            id: userdata._id
        }
        const res = await fetch('/updatecheck', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(updatedata)
        })
        const data = await res.json();

        if (data.status === "you can update") {
            setCount("checked");

        }
        else {
            window.alert("password is not matching");
        }

    }

    const upload = () => {
        navigate("/upload")

    }

    const showdata = (e) => {






        navigate("/data", {
            state: { check: e.target.value }
        })
    }


    const update = () => {

        setCount("update")
    }


    if (count === "showdata") return <Showdata check={checkStatus}></Showdata>;
    if (count === "checked") return <Update countState={setCount}></Update>

    return count === "update" ? (<>

        <div className="w-25 check_update m-auto pt-5">

            <div className="mb-3 ">
                <label for="exampleInputPassword1" className="form-label">Password:</label>
                <br />
                <span className="text-success fw-bold">{userdata.username}</span>
                <input type="password" className="form-control shadow-lg rounded-3" id="Password"></input>
            </div>

            <button type="submit" className="btn btn-primary" onClick={checkpassword}>Submit</button>
            <h5>Varify With Google</h5>
            <GoogleLogin
                clientId="1046054081051-06rof3bes5kl7hq46cc8h0sdhn3vie2j.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={onLoginSuccess}
                onFailure={onLoginFail}
                cookiePolicy={'single_host_origin'}
            />,

        </div>

    </>) : (<>
        <div className="contener w-100 " id="cont">
            <div className="card h-75 m-3 shadow-lg  mb-5 bg-body rounded " >
                <div className="detail">
                    <img src={userdata.profile} className="card-img-top profile_logo rounded-circle shadow-lg p-3 mb-5 bg-body rounded " alt="..."></img>
                    <div className="card-body">
                        <h5 className="card-title fs-3 " >{userdata.name}</h5>
                        <p className="card-text fs-6">#About(discription)
                            <br></br>
                            <span className="fs-6 ">{userdata.about}</span>
                        </p>
                        <button className="btn btn-primary">#Know More</button>
                    </div>
                </div>
                <div className="update w-auto fs-6">
                    <div className="list_contenar w-auto shadow p-3 mb-5 bg-body rounded">
                        <ul>
                            <li className="link-danger" onClick={update}>Update Profile Image: <img alt="logo"></img></li>
                            <li className="link-danger" onClick={update}>Update Name:</li>
                            <li className="link-danger" onClick={update}>Update About</li>
                        </ul>
                    </div>
                    <div className="button_contenar shadow p-3 fs-6 mb-5 bg-body rounded  ">
                        <button className="btn btn-outline-dark m-lg-2" value="image" onClick={showdata}>Image</button>
                        <button className="btn btn-outline-dark m-lg-2" value="video" onClick={showdata}>Video</button>
                        <br></br>
                        <button className="btn btn-outline-dark m-lg-2" value="document" onClick={showdata}>Document</button>

                        <button className="btn btn-outline-danger m-lg-2" onClick={upload}> Upload</button>
                    </div>

                </div>

            </div>

            <div className="favrate_collection align-items-center justify-content-center shadow-lg p-3 mb-5 bg-body rounded w-25">
                <h4>Favorite Collection</h4>


                <h6>image</h6>
                <div id="carouselExampleControls" style={{ display: "flex" }} className=" position-static carousel slide m-auto center shadow p-3 hidescrollbar mb-5 bg-body overflow-scroll " data-bs-ride="carousel">

                    {
                        favorite.image.map((val) => {

                            return <>
                                <div className="position-inherit m-1 border" >

                                    <img src={val.path} className="d-block  position-inherit " alt="..." style={{ width: "15vw" }}></img>
                                </div>
                            </>
                        })
                    }

                </div>




                <h6>video</h6>

                <div id="carouselExampleControls" style={{ display: "flex" }} className=" position-static carousel slide m-auto center shadow p-3 hidescrollbar mb-5 bg-body overflow-scroll " data-bs-ride="carousel">
                    {
                        favorite.video.map((val) => {
                            return <>
                                <div className="position-inherit m-1 border" >

                                    <video className="card-img  shadow-lg rounded-3 m-auto" controls alt="..." autoStart="false" style={{ width: "15vw" }}>
                                        <source src={val.path}></source>
                                    </video>

                                </div>
                            </>
                        })
                    }


                </div>
                <h6>document</h6>

                <div id="carouselExampleControls" style={{ display: "flex" }} className=" position-static carousel slide m-auto center shadow p-3 hidescrollbar mb-5 bg-body overflow-scroll " data-bs-ride="carousel">
                    {
                        favorite.document.map((val)=>{
                        return <>
                         <div className="position-inherit m-1 border" >
                            <iframe title="data" src={val.path} className="card-img  shadow-lg rounded-3 m-auto" alt="..." style={{ width: "15vw" }}></iframe>

                            </div>
                        </>
                           
                        })
                    }
                </div>

            </div>
        </div>


    </>)




}

export default UserHome;
