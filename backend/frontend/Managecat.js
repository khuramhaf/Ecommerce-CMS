import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Addproduct from './Addproduct';
import Deletecat from './Deletecat';
import { Routes, Route, Link } from "react-router-dom";
import Style from './Style.module.css'

function Managecat() {
  const [status, setstatus] = useState("");
  const [name, setName] = useState("");
  const [image, setimage] = useState("image2.jpg");

  function setname(e){
setName(e.target.value);

  }

  function handleSubmit(event){
    event.preventDefault();

    if (name === ""){
      setstatus("please enter the cateogery");
    }
else{
setstatus("");
    var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
    
      var obj = JSON.parse(this.responseText);
      if (obj.code === 48){
        setstatus("cateogery already exist");
      }
    }
  };
  xhttp.open("POST", "/navadd", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("data="+name);
 }

  }


  return (
    <div className={Style.add}>

        <h2>Manage cateogery</h2>
        <h3>Add cateogery</h3>

      <span>{status}</span>

<form  onSubmit={handleSubmit}>
      
        <input className={Style.input} placeholder='Enter your Cateogery'
          type="text" 
         
          onChange={setname}
        />
        <br></br>
      <input className={Style.inputbutton} type="submit" />
    </form>
    
    <Deletecat />

      
    </div>
  );
}

export default Managecat;
