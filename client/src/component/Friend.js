import React, { useState, useEffect } from 'react';
import "./css/login.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom'
import './css/friend.css'
import "./css/gallery.css"



const Friend = () => {


    const [friend, setFriend] = useState([]);
    const [request, setRequest] = useState([]);
    const [friendRequest, setFriendRequest] = useState([]);
    const [inviteFriend, setInviteFriend] = useState([]);
    const location = useLocation()
    const locationData = location.state;
    const [profileData, setProfileData] = useState(location.state);
    const [frienddata, setFriendData] = useState(location.state)

    
    const navigate = useNavigate();
    const getfrienddata = async () => {
        
        const res = await fetch("/request", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ sender: locationData.ind })
        })
        
        const data = await res.json();
    
        setFriend(data.friend);
        setRequest(data.request);
        setFriendRequest(data.friendrequest);
        setInviteFriend(data.invitefriend);

    }
    useEffect(() => {

        
        getfrienddata();


    },[]);



    const newrequest = async (e) => {

        const res = await fetch("/newrequest", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ resciver: e.target.value, sender: locationData.ind })
        })

        const data = await res.json();

        setFriend(data.friend);
        setRequest(data.request);
        setFriendRequest(data.friendrequest);
        setInviteFriend(data.invitefriend);
    }

    const showdata = (e) => {
    
        const value = e.target.value;
        navigate("/frienddata", {
            state: { data: frienddata, check: value }
        })
    }

    async function setprofile(val, status) {
        if (status === "nonfriend") {
            const res = await fetch("/friemdpublicdata", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({ id: val._id })
            })

            const data = await res.json();
            
            setProfileData(data);
            setFriendData(data);
        }

        if (status === "friend") {

            const res = await fetch("/frienddata", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({ id: val._id })
            })

            const data = await res.json();
            
            setProfileData(data);
            setFriendData(data);
        }



    }

    return (<>

        <div className="contenar  d-flex mt-5 pb-5">

            <div className="card h-75 m-3 w-75 shadow-lg mt-5 mb-5 bg-body rounded " >
                <div className="detail">
                    <img src={profileData.profile} className="card-img-top profile_logo rounded-circle shadow-lg p-3 mb-5 bg-body rounded " alt="..."></img>
                    <div className="card-body">
                        <h5 className="card-title fs-3 " >{profileData.name}</h5>
                        <p className="card-text fs-6">#About(discription)
                            <br></br>
                            <span className="fs-6 ">{profileData.about}</span>
                        </p>
                        <button className="btn btn-primary">#Know More</button>
                    </div>
                </div>
                <div className="update w-75 fs-6">
                    {/* <div className="list_contenar w-auto shadow p-3 mb-5 bg-body rounded">
                        <ul>
                            <li className="link-danger" >Update Profile Image: <img alt="logo"></img></li>
                            <li className="link-danger" >Update Name:</li>
                            <li className="link-danger" >Update About</li>
                        </ul>
                    </div> */}
                    <div className="button_contenar shadow p-3 fs-6 mb-1 bg-body rounded w-75 align-items-center justify-content-center  ">
                        <button className="btn btn-outline-dark  " value="image" onClick={showdata} >Image</button>
                        <button className="btn btn-outline-dark " value="video" onClick={showdata} style={{marginLeft:"1px",marginRight:"1px"}} >Video</button>
                        <br></br>
                        <button className="btn btn-outline-dark " value="document" onClick={showdata}>Document</button>

                        
                    </div>
                    <div className="  shadow-lg rounded-3 w-75 h-75 mb-1">
    <div className="heading">
      <h3> <span>Gallery</span></h3>
    </div>
    <div className="box">
      
      <div className="dream align-items-center text-center justify-content-center ">
        {
            
            frienddata? frienddata.image.map((val)=>{
            
                return <span style={{width:"90%",margin:"2px"}}>
                    <img src={val.path} style={{width:"95%"}} alt="img"></img>
                </span>
            }):null
            
        }
           {
          frienddata?  frienddata.video.map((val)=>{
                
                return <span style={{width:"90%",margin:"2px"}}>
                   <video className="card-img  shadow-lg rounded-3 m-auto" controls alt="..." autoStart="false" style={{width:"95%"}}>
                        <source src={val.path}></source>
                    </video>
                </span>
            }):null
            
        }
           {
           frienddata? frienddata.document.map((val)=>{
                
                return <span className="h-25 w-25" style={{width:"90%",margin:"2px"}}>
                   <iframe src={val.path}title='data' className="card-img  shadow-lg rounded-3 m-auto" alt="..." style={{width:"95%"}}></iframe>
                </span>
            }):null
            
        }   
      </div>




    </div>
    <div className="btn">
      <button value="image " className='btn btn-outline-dark ' onClick={showdata} >More</button>
    </div>





  </div>

                </div>
            </div>


            <div className="friend_contenar mt-5 h-75 w-auto d-flex " style={{ minWidth: "40vw" }}>
                <div className=" friend list-group shadow rounded-3 w-50 p-1 m-auto text-center align-items-center overflow-scroll  " style={{ height: "30vw" }}>
                    <h2 className='rounded shadow bg-body text-primary p-1 fs-6'>My friend</h2>


                    {
                        friend === "" ? <>you have not any friend </> : friend.map((val) => {
                            return <> <div href="#" className="f_c list-group-item list-group-item-action shadow rounded-3 active " aria-current="true">
                                <div className="d-flex w-100 justify-content-between pe-auto" style={{ cursor: "pointer" }} onClick={() => { setprofile(val, "friend") }}>
                                    <img src={val.profile} className=" rounded-3 shadow friend_logo" alt="" style={{ width: "40px" }} />

                                    <div>
                                        <h5 className="mb-1 fs-6 pe-auto">{val.username}  </h5>
                                        <div><button className="fs-6 btn m-0" value={val.ind} onClick={newrequest}>Unfriend</button></div>
                                    </div>



                                </div>
                            </div>
                            </>
                        })
                    }





                </div>

                <div className=" friend w-50  list-group shadow rounded-3  p-1 text-center align-items-center ml-auto m-2 overflow-scroll " style={{ height: "30vw" }}>
                    <h2 className='rounded shadow bg-body text-primary p-1 fs-6'>Invite</h2>
                    {
                        inviteFriend ? inviteFriend.map((val) => {
                           
                            return (
                                <div href="#" className="f_c list-group-item list-group-item-action shadow rounded-3 active " aria-current="true">
                                    <div className="d-flex w-100 justify-content-between pe-auto" style={{ cursor: "pointer" }} value={val} onClick={() => { setprofile(val, "nonfriend") }}>
                                        <img src={val.profile} className=" rounded-3 shadow friend_logo" alt="" style={{ width: "40px" }} />
                                        <div>
                                            <h5 className="mb-1 fs-6 pe-auto">{val.username}  </h5>
                                            <div><button className="fs-6 btn m-0" value={val.ind} onClick={newrequest}>Request </button></div>
                                        </div>

                                    </div>
                                </div>)
                        }) : null
                    }



                </div>
            </div>
        </div>

        <div className="second d-flex w-50 position-relative right">
            <div className=" friend list-group shadow rounded-3 w-50 p-1 m-auto text-center align-items-center overflow-scroll  " style={{ height: "30vw" }}>
                <h2 className='rounded shadow bg-body text-primary p-1 fs-6'>My Request</h2>


                {
                    request === "" ? <>you have not requested to anyone</> : request.map((val) => {
                        return <> <div href="#" className="f_c list-group-item list-group-item-action shadow rounded-3 active " aria-current="true">
                            <div className="d-flex w-100 justify-content-between " style={{ cursor: "pointer" }} value={val} onClick={() => { setprofile(val, "nonfriend") }}>
                                <img src={val.profile} className=" rounded-3 shadow friend_logo" alt="" style={{ width: "40px" }} />

                                <div>
                                    <h5 className="mb-1 fs-6 pe-auto">{val.username}  </h5>
                                    <div><button className="fs-6 btn m-0" value={val.ind} onClick={newrequest}>Unrequest</button></div>
                                </div>



                            </div>
                        </div>
                        </>
                    })
                }







            </div>

            <div className=" friend list-group shadow rounded-3 w-50 p-1 m-auto text-center align-items-center overflow-scroll  " style={{ height: "30vw" }}>
                <h2 className='rounded shadow bg-body text-primary p-1 fs-6'>My Friend Request</h2>


                {
                    friendRequest === "" ? <> You Have Not Any Friend  Request </> : friendRequest.map((val) => {
                        
                        return <> <div href="#" className="f_c list-group-item list-group-item-action shadow rounded-3 active  " aria-current="true">
                            <div className="d-flex w-100 justify-content-between pointer-event" style={{ cursor: "pointer" }} value={val} onClick={() => { setprofile(val, "nonfriend") }}>
                                <img src={val.profile} className=" rounded-3 shadow friend_logo" alt="" style={{ width: "40px" }} />

                                <div>
                                    <h5 className="mb-1 fs-6 pe-auto">{val.username}  </h5>
                                    <div><button className="fs-6 btn m-0" value={val.ind} onClick={newrequest}>Make Friend</button></div>
                                </div>



                            </div>
                        </div>
                        </>
                    })
                }







            </div>

        </div>



    </>)
}
export default Friend;

