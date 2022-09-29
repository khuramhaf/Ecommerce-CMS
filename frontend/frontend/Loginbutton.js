
import Login from './Login'
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, Routes, Route } from "react-router-dom";
import Style from './Style.module.css'
import Notfound from './Notfound';

function Loginbutton(props) {
    const [loginstate, setloginstate] = useState("login");
    const [username, setusername] = useState("");

    useEffect(() => {

        var getitem = localStorage.getItem("logindetail");
        setusername(getitem);

        if (localStorage.getItem("loginstatus") === "logout"){
            setloginstate("logout");
          
          }
      
    }, []);


    function setstate(){
        setloginstate('login');
        setusername("");
        localStorage.removeItem("logindetail");
        localStorage.removeItem("loginstatus");
    }

    if (loginstate === "login"){
        return (
            <div>
            
            <Link to="login"><button className={Style.buttonsend1}>login</button></Link>
            <Routes>
            <Route path="/login" element={<Login setusername={setusername} setloginstate={setloginstate} />} />
            <Route path="*" element={""} />
            
            </Routes>
            </div>
          );
        
    }


    else {
        return (
            <div>
            <span>welcome {username}</span>
           <button  className={Style.buttonsend1} onClick={setstate}>logout</button>
             
            </div>
          );
    }
  
}

export default Loginbutton;