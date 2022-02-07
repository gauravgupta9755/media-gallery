import './App.css';
import Login from './component/Login';
import Register from './component/register';
import UserHome from './component/user_home';
import NewsPage from './component/News/Newspage';
import NavBar from "./component/nav_bar"
import Upload from './component/upload';
import Friend from './component/Friend'
import MainHome from './component/Mainhome';
import Footer from './component/footer';
import Showdata from './component/showdata';
import FriendData from "./component/friendData"

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'





  function App() {

   


    return (<>

   
      

    <Router>
    
    <div className="padding w-auto mb-5 " ></div>
    <NavBar></NavBar>
    
    <Routes>
    <Route path="/newsgallery" exact element={<NewsPage></NewsPage>}></Route>
    <Route path="/" exact element={<MainHome/>}></Route>
    <Route path="/register" exact element={<Register/>}></Route>
    <Route path="/login" exact element={<Login></Login>}></Route>
    <Route path="/friend" exact element={<Friend></Friend>}></Route>
    <Route path="/upload" exact element={<Upload></Upload>}></Route>
    <Route path="/userhome" exact element={<UserHome></UserHome>}></Route>
    <Route path="/data" exact element={<Showdata></Showdata>}></Route>
    <Route path="/frienddata" exact element={<FriendData></FriendData>}></Route>
    
   
    </Routes>
    <Footer></Footer>
    </Router>
     

    
     
    </>
    );
  }

export default App;
