import React, {  useState } from "react";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logout from "../image/logout.png";
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
 import updataLoginData from "../action/index";



const NavBar = () => {
  const loginState= useSelector((state)=>state.updateData);
  
  const dispatch=useDispatch();
  const logo_style = {
    width: "30px",
    height: "30px",
    borderRadious: "50px"
  }
  const contenar_style = {
    color: "white",
    width: "100%",
    top: "0",
    zIndex: "10"

  }


  const navigate = useNavigate();
  
  const [dis, setDis]= useState("none");

  const dropdown = () => {
    
    if (dis === "none") {
      setDis("inline");
    }
    else {
      setDis("none");
    }
  }
const unsetdropdown=()=>{
  
  if(dis==="inline"){
    
    setDis("none");
  }
  
}

  const logOut = () => {
    dispatch(updataLoginData({_id: '48484954954545', name: 'Name', profile: './profile/profile.png', username: "username", about: 'Happy 😄 Day',gallery: "My Gallery"}));
   
    window.history.replaceState("/userhome", "");
    navigate("/login");
  }

  const home = () => {
   
    if(loginState.name==="Name"){
      window.alert("please login");
      return;
    }
      navigate("/userhome", {

        search: `?${loginState.username}`,
        state: loginState,
        status: "login",
        
      });
    
   
  }




const goFriend = (e) => {

  navigate("/friend", {

    search: `?${loginState.username}`,
    state: loginState,
    status: "friend",
    from: e.target.value
  });
}

const Gallery=(e)=>{
  navigate("/newsgallery");
}
return (<>

  <div className="contenar position-fixed " id="nav" style={contenar_style} >
    <Navbar bg="white" expand="lg" mb="3">
      <Container>
        <Navbar.Brand href="/">Gallery</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  ><span onClick={home} id="home">{loginState.gallery}</span></Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item ><span onClick={Gallery}>News Gallery</span> </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">About</NavDropdown.Item>
            
            </NavDropdown>
          </Nav>
          <Nav>

            <Nav.Link href="/login"><span style={{ display: loginState.name==="Name"?"inline":"none" }}>Login</span></Nav.Link>
            <Nav.Link href="/register"><span style={{ display: loginState.name==="Name"?"inline":"none" }}><span>Register</span></span></Nav.Link>
            <Nav.Link ><div onClick={logOut} style={{ display:loginState.name==="Name"?"none":"inline" }}><img src={logout} style={logo_style} alt="img"></img></div></Nav.Link>

            <Nav.Link><div className="dropdown " style={{ display: loginState.name==="Name"?"none":"inline"}} id="login">
              <img onClick={dropdown} src={loginState.profile} style={logo_style} alt="img"></img>
              <span onClick={dropdown}>{loginState.username}</span>

              <br />
              <ul className=" shadow rounded-3 list-unstyled  text-center bg-body position-absolute " style={{ paddingRight: "15px", zIndex: 3, display:dis }} onClick={unsetdropdown} >
                <li className="shadow rounded dropdown-item m-2" onClick={logOut}>Logout</li>
                <li className="shadow rounded dropdown-item m-2" onClick={home}>Home</li>
                <li className="shadow rounded dropdown-item m-2" value="myfriend" onClick={goFriend}>My Friend</li>
                <li className="shadow rounded dropdown-item m-2" value="request" onClick={goFriend}>Request</li>
                <li className="shadow rounded dropdown-item m-2" value="invite" onClick={goFriend}>Invite</li>

              </ul>

            </div> </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>

</>)
}
export default NavBar;