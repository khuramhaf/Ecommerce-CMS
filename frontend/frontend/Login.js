

import React from 'react';
import { useState, useEffect } from 'react';

function Login(props) {

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [status, setstatus] = useState("");


  function usernameset(e){

    setusername(e.target.value)

    console.log(e.target.value)
  }

  function passwordset(e){

    setpassword(e.target.value)
    console.log(e.target.value)
  }

  function handleSubmit(event){
    event.preventDefault();

    setstatus('');

   var myobj={_id: username, password: password}


   fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(myobj)
  })
  .then((res)=>res.json())
  .then((res1)=>{
    if (res1.code===null){
      setstatus("username or password does not match")
    }
    else if (res1.code === "ok"){
props.setloginstate("logout");
props.setusername(res1.name);

if (localStorage.getItem("logindetail") === null){
  window.localStorage.setItem('logindetail', res1.name);
  console.log(localStorage.getItem("logindetail"))

}

if (localStorage.getItem("loginstatus") === null){
  window.localStorage.setItem('loginstatus', "logout")
  console.log(localStorage.getItem("loginstatus"))
}
      
    }
    
  })
  }

  return (
    <div>
    {status}
    <form onSubmit={handleSubmit}>
      <label>Enter your user name:
        <input
          type="text" 
          onChange={usernameset}
        />
      </label>

      <label>Enter your password:
        <input
          type="text" 
          onChange={passwordset}
        />
      </label>

      <input type="submit" />
    </form>
     
    </div>
  );
}

export default Login;