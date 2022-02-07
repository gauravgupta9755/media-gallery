import React, { useState,useEffect } from "react";

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useSelector,useDispatch } from 'react-redux';
 import updataLoginData from "../action/index";


const ShowDataCard = (props) => {
    
    const [statePublic, setstatePublic] = useState("unset");
    const loginState= useSelector((state)=>state.updateData);
    const [likestatus,setLikeStatus]=useState("none");
    const [unlikestatus,setUnlikeStatus]=useState("inline");
    const dispatch=useDispatch();
    const deletedata = async () => {

        const res = await fetch("/delete", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ dataid: props.val._id, typ: props.typ,user_id:loginState._id })
        })
        const data = await res.json()
       
     
        dispatch(updataLoginData(data.data[0]));
    }

    

    useEffect(() => {
        if(props.public==="public"){
            setstatePublic("none")

        }

        for(let i=0;i<loginState.like.length;i++){
            if(props.val._id===loginState.like[i]){
                setLikeStatus("inline");
                setUnlikeStatus("none");
                break;

            }
        }
    },[]);

   
    const  updateStatus= async(e)=>{
        const value=e.target.value;
        const res = await fetch("/updatestatus", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ status:value,dataid: props.val._id,typ: props.typ,user_id:loginState._id })
        })
        const data = await res.json()
       
     
       
        dispatch(updataLoginData(data.data[0]));
    }


    const like=async()=>{
        const res = await fetch("/like", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({dataid: props.val._id,typ:props.typ,user_id:loginState._id })
        })
        const data = await res.json()
    
       dispatch(updataLoginData(data.data[0]));

      if(likestatus==="none"){
          setLikeStatus("inline");
          setUnlikeStatus("none");
          
      }
      else{
        setLikeStatus("none");
        setUnlikeStatus("inline");
        
      }
    
    }
    return <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div className="col-md-4">
            
            <div className="card cardshowdata shadow rounded-3  d-flex w-100 mr-2 p-2 mt-3">
                {
                    props.typ === "video" ? <video className="card-img  shadow-lg rounded-3 m-auto" controls alt="..." autoStart="false">
                        <source src={props.val.path}></source>
                    </video> : null


                }
                {
                    props.typ === "image" ? <img src={props.val.path} className="card-img  shadow-lg rounded-3 m-auto" alt="..." ></img> : null
                }

                {
                    props.typ === "document" ? <iframe title="data" src={props.val.path} className="card-img  shadow-lg rounded-3 m-auto" alt="..."></iframe> : null
                }

                <div className=" patti shadow rounded-3 w-100 m-auto fs-6 mb-2 mt-2 pb-2 p-lg-2">
                    <h5 className="card-title">{props.val.title}</h5>
                    <div className="d-flex m-auto p-lg-1 m-2 shadow rounded-3 w-100 text-center justify-content-center "  >
                        <span className="m-1 shadow rounded-3 w-auto  btn btn-light " style={{display:statePublic}}  onClick={deletedata}> <img src="https://img.icons8.com/ios-glyphs/25/000000/filled-trash.png"alt="img" /></span>
                        <div style={{display:statePublic}}>
                        <span className="m-1 shadow rounded-3 w-auto d-flex btn  "  style={{display:statePublic}}>     <NavDropdown title={props.val.status} id="basic-nav-dropdown">
                            <NavDropdown.Item ><button style={{display:statePublic}} onClick={updateStatus} value="public">public</button></NavDropdown.Item>
                            <NavDropdown.Item ><button style={{display:statePublic}} onClick={updateStatus} value="private">private</button></NavDropdown.Item>
                            <NavDropdown.Item ><button style={{display:statePublic}} onClick={updateStatus} value="protected">protected</button></NavDropdown.Item>


                        </NavDropdown></span>
                        </div>
                        <span className="m-1 shadow rounded-3  w-auto btn "><a href={props.val.path} download><img src="https://img.icons8.com/material-outlined/24/000000/download--v1.png" alt="img"/></a></span>
                        <span className="m-1 shadow rounded-3 w-auto btn "value ={props.val._id} onClick={like}><img src="./like.png" style={{width:"15px",display:likestatus}} alt="img"></img><img src="./unlike.png" style={{width:"15px",display:unlikestatus}} alt="img"></img></span>

                    </div>

                </div>
            </div>

        </div>
    </>

}


export default ShowDataCard;