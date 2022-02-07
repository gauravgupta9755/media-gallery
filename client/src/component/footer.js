import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Footer=()=>{
    return (<><div className="footer d-flex  p-3 opacity-75   shadow-lg rounded-3" style={{fontSize:"1vw",width:"100vw",position:"relative",top:"50%"}} >
             <div className="socialmedia w-100 opacity-75  d-flex m-auto text-center">
                 <div className="right w-50 opacity-100">
                   <h6>Created By - <span>Gaurav Gupta</span></h6>
                 </div>
                 <div className="left d-flex w-50 m-auto text-center opacity-100">
                     <p className=' text-center  m-auto'>Social meadia </p>
                     <span className=' m-auto shadow rounded-3 p-1'>Facefook</span>
                     <span className=' m-auto shadow rounded-3 p-1'>Instagram</span>
                     <span className=' m-auto shadow rounded-3 p-1 '>Linkedin</span>
                                      </div>
                 </div>
        </div></>)
}

export default Footer;