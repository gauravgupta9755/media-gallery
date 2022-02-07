import React, { useState, useEffect } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./css/showdata.css";
import ShowDataCard from './ShowdataCard'
import { useSelector} from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import "./css/responsive/showdata.css";

const Showdata = (props) => {

    
    const [image, setImage] = useState("none");
    const [video, setVideo] = useState("none");
    const [documentData, setDocument] = useState("none");
    const [publicData, setPublicData] = useState("");
    const [publicDataVal, setPublicDataVal] = useState("");
    const loginState= useSelector((state)=>state.updateData);
    const navigate=useNavigate();
    const location=useLocation();




    //  fetching public data----------------------------------

    const fetchPublicData = async () => {
        
        const res = await fetch("/publicdata");
        const data=await res.json();
        setPublicDataVal(data);
        
    }

    let x = false, y = false, z = false, za = false;
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
        <div className=" contenar h-100 w-100 d-flex p-2 ">
            <div className="setstatus"> 
                         <input className="form-check-input me-1" type="checkbox" id="image" defaultChecked={x} value="image" onChange={onChange}></input>
                        image
                        <input className="form-check-input me-1" type="checkbox" id="video" defaultChecked={y} value="video" onChange={onChange}></input>
                        video
                        <input className="form-check-input me-1" type="checkbox" id="document" defaultChecked={z} value="document" onChange={onChange}></input>
                        document
                        <input className="form-check-input me-1" type="checkbox" id="public" defaultChecked={za} value="public" onChange={onChange}></input>
                        Public data
            </div>
            <div className="h-100 w-75 c1 contenar " >
                <div className="row g-3 left_contenar  w-100 text-center overflow-scroll shadow-lg rounded-3 m-auto pb-4" style={{ maxHeight: "100vh" }}>

                    {
                         image === "image"&&loginState.image  ? loginState.image.map((el) => {


                            return <ShowDataCard val={el} typ="image"  ></ShowDataCard>
                        }) :null
                    }


                    {
                         video === "video"&&loginState.video  ? loginState.video.map((el) => {


                            return <ShowDataCard val={el} typ="video" ></ShowDataCard>

                        }) : video === "video" ? <><p>you have not any video</p></> : <></>


                    }




                    {
                     documentData === "document"&&loginState.document? loginState.document.map((el) => {




                            return <ShowDataCard val={el} typ="document" ></ShowDataCard>

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
                    <label className="list-group-item">
                        <input className="form-check-input me-1" type="checkbox" id="public" defaultChecked={za} value="public" onChange={onChange}></input>
                        Public data
                    </label>

                </div>





            </div>
        </div>

    </>)
}

export default Showdata;