import React, { useState, useEffect } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./css/showdata.css";
import "./css/friend_data.css";

import ShowDataCard from './ShowdataCard'
import { useLocation, useNavigate } from 'react-router-dom';
const FriendData = (props) => {

    
    const location=useLocation();

    const [image, setImage] = useState("none");
    const [video, setVideo] = useState("none");
    const [documentData, setDocument] = useState("none");
    const [publicData, setPublicData] = useState("");
    const [publicDataVal, setPublicDataVal] = useState("");
    const loginState=location.state.data;
    const navigate=useNavigate();

    //    news api --------------------------------
    //    news api --------------------------------




    // const getnews = async () => {
    //     const res = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=3d04b6a557fd4631b373a3d23aa3714a`)
    //     const val = await res.json();
    //     if (val.status == "error") {
    //         setNews([]);
    //     }
    //     else {
    //         setNews(val)
    //     }
    //     setNews(val)
    //     const res1 = await fetch(`https://newsapi.org/v2/everything?q=tesla&from=2021-11-11&sortBy=publishedAt&apiKey=3d04b6a557fd4631b373a3d23aa3714a`)
    //     const val1 = await res1.json()
    //     if (val1.status == "error") {
    //         setInterNationalNews([]);
    //     }
    //     else {
    //         setInterNationalNews(val1);
    //     }

    //     const res2 = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=3d04b6a557fd4631b373a3d23aa3714a`)
    //     const val2 = await res2.json();
    //     if (val2.status == "error") {
    //         setScienceNews([])
    //     }
    //     else {
    //         setScienceNews(val2);

    //     }
    // }

    //  fetching public data----------------------------------

    const fetchPublicData = async () => {
        
        const res = await fetch("/publicdata");
        const data=await res.json();
        setPublicDataVal(data);
        
    }

    let x = false, y = false, z = false;
    useEffect(() => {
        if(loginState.name==="Name"){
            window.alert("please login");
            navigate("/login");
            return 
        }
        // getnews();
        fetchPublicData();
        if (location.state.check === "image") {
            setImage("image");
        }
        if (location.state.check === "video") {
            setVideo("video");
        }
        if (location.state.check === "document") {
            setDocument("document");
        }
    }, []);


    if (location.state.check === "image") {
        x = true;
    }
    if (location.state.check === "video") {
        y = true;
    }
    if (location.state.check === "document") {
        z = true;
    }



    const onChange = (e) => {
        
        if (e.target.value === "image") {
            if (image !== "image") {
                setImage("image");
            }
            else {
                setImage("none")
            }
        }
        if (e.target.value === "video") {
            if (video !== "video") {
                setVideo("video");
            }
            else {
                setVideo("none")
            }
        }
        if (e.target.value === "document") {
            if (documentData !== "document") {
                setDocument("document");
            }
            else {
                setDocument("none")
            }
        }

        if (e.target.value === "public") {
            if (publicData !== "public") {
                setPublicData("public");
            }
            else {
                setPublicData("none")
            }
        }
    }






   


    return (<>
        <div className=" contenar h-100 d-flex p-2 ">
        <div className="detail friend_detail shadow rounded-3 ">
                    <img src={loginState.profile} className="card-img-top profile_logo rounded-circle shadow-lg p-3 mb-5 bg-body rounded " alt="..."></img>
                    <div className="card-body">
                        <h5 className="card-title fs-3 " >{loginState.name}</h5>
                        <p className="card-text fs-6">#About(discription)
                            <br></br>
                            <span className="fs-6 ">{loginState.about}</span>
                        </p>
                        <button className="btn btn-primary">#Know More</button>
                    </div>
                </div>
            <div className="h-100 w-75 friend_data " >
                <div className="row g-3 left_contenar  w-100 text-center overflow-scroll shadow-lg rounded-3 m-auto pb-4" style={{ maxHeight: "100vh" }}>

                    {
                         image === "image"&&loginState.image  ? loginState.image.map((el) => {


                            return <ShowDataCard val={el} typ="image"  public="public" ></ShowDataCard>
                        }) :null
                    }


                    {
                         video === "video"&&loginState.video  ? loginState.video.map((el) => {


                            return <ShowDataCard val={el} typ="video"  public="public"></ShowDataCard>

                        }) : video === "video" ? <><p>you have not any video</p></> : <></>


                    }




                    {
                     documentData === "document"&&loginState.document? loginState.document.map((el) => {




                            return <ShowDataCard val={el} typ="document" public="public" ></ShowDataCard>

                        })
                            : documentData === "document" ? <><p>you have not any document</p></> : <></>
                    }



                    {   



                        publicData === "public"  ? publicDataVal.image.map((res) => {

                            
                                return <ShowDataCard val={res} typ="image" public="public" ></ShowDataCard>
                            
                        }) : null

                        

                    }

{



publicData === "public"  ? publicDataVal.video.map((res) => {

        return <ShowDataCard val={res} typ="video" public="public" ></ShowDataCard>
    
}) : null



}

{



publicData === "public"  ? publicDataVal.document.map((res) => {

    
        return <ShowDataCard val={res} typ="document" public="public"></ShowDataCard>
    
}) : null



}








                </div>





            </div>



            {/* right -contenair ------------------------------------------------         */}
            <div className="right_contenar w-25  bg-gradient " style={{ height: "400px" }}>

                <div className="list-group">
                    <label className="list-group-item">
                        <input className="form-check-input me-1" type="checkbox" id="image" defaultChecked={x} value="image" onChange={onChange}></input>
                        Images
                    </label>
                    <label className="list-group-item">
                        <input className="form-check-input me-1" type="checkbox" id="video" defaultChecked={y} value="video" onChange={onChange}></input>
                        Videos
                    </label>
                    <label className="list-group-item">
                        <input className="form-check-input me-1" type="checkbox" id="document" defaultChecked={z} value="document" onChange={onChange}></input>
                        Documents
                    </label>
                    

                </div>





            </div>
        </div>

    </>)
}

export default FriendData;