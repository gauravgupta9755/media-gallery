import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/mainhome.css'
import { useNavigate } from 'react-router-dom';
import './css/responsive/mainhome.css';




const MainHome = () => {
    
    const navigate=useNavigate()

    const register=()=>{
        navigate("./register");

    }
    return (<>
        <div className=" m-1 w-auto pt-1 mainhomecontenar overflow-hidden m-auto " >
            {/* <div className="backgroundimage position-absolute w-100 h-75 " style={homestyle}>ergfg</div> */}
            <div id="carouselExampleControls" className="carousel slide opacity-75 m-auto " style={{height:"17vw"}} data-bs-ride="carousel">
                <div className="carousel-inner backimage">
                    <div className="carousel-item active ">
                        <img src="./gallery.jpg" className="d-block w-100" alt="..."></img>
                    </div>
                    <div className="carousel-item ">
                        <img src="./logout.png" className="d-block w-100" alt="..."></img>
                    </div>
                    <div className="carousel-item ">
                        <img src="./gallery.jpg" className="d-block w-100" alt="..."></img>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
          
            <div className="content text-center position-relative " style={{top:"-15vw"}}>
                <h1 className="text-truncate fw-bold fs-1">Gallery</h1>
                <p className=" fs-2 text-danger  fw-bold">Create Your Own Gallery</p>
                <button className='btn btn-primary fs-6' onClick={register}>Create Gallery</button>
            </div>
            <div className="gallery m-auto  text-center  text-center mb-3     " style={{zIndex:-1,width:"50vw",height:"10vw",position:"relative",top:"5%"}}>
        
        <span style={{"--i":"1"}}><img  src="./imge/basant-nepali-130q1oAHsPo-unsplash.jpg" style={{width:"20%"}} alt=""></img></span>
        <span style={{"--i":"2"}}><img  src="imge/zq-lee-VbDjv8-8ibc-unsplash.jpg" alt="" style={{width:"20%"}}></img></span>
        <span style={{"--i":"3"}}><img  src="./imge/sooraj-dev-t5YnzOdhF7g-unsplash.jpg" alt="" style={{width:"20%"}}></img></span>
        <span style={{"--i":"4"}}><img  src="./imge/tatvam-villas-pRSKjH7nWBE-unsplash.jpg" alt="" style={{width:"20%"}}></img></span>
        <span  style={{"--i":"5"}}><img src="./imge/sanjay-dosajh-knsmO_LBZ-8-unsplash.jpg" alt="" style={{width:"20%"}}></img></span>
        <span style={{"--i":"6"}}><img  src="./imge/ramnit-bagga-16X-ZJBYq0k-unsplash.jpg" alt="" style={{width:"20%"}}></img></span>
        <span style={{"--i":"7"}}><img  src="./imge/pedro-marroquin--hDsIhpgCdU-unsplash.jpg" alt="" style={{width:"20%"}}></img></span>
        <span style={{"--i":"8"}}><img  src="./imge/naman-jaswani-Xpwj1j1HX34-unsplash.jpg" alt="" style={{width:"20%"}}></img></span>
    </div>
        </div>
        
    </>);
}

export default MainHome;