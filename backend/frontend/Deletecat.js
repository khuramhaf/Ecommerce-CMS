import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Style from './Style.module.css'

function Deletecat() {
  const [status, setstatus] = useState("");
  const [catget, setcatgetstate] = useState([]);
  const [catname, setcatnamestate] = useState("");
  

  useEffect(() => {
    fetch ("/catget")
    .then(x => x.json())
    .then(y => setcatgetstate(y));
  }, []);

  
  
  function setcatname(e){
setcatnamestate(e.target.value);
console.log(e.target.value);
}


  function handleSubmit(event){
    event.preventDefault();

    if (catname === ""){
      setstatus("please select a cateogery");
    }
    else {
      setstatus("")
    var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      console.log(this.responseText);
    }
  };
  xhttp.open("POST", "/delcat", true);
  var myobj = { cat: catname };
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(myobj));



var array = catget.slice();
console.log(array);

var x = 0;

while(x<array.length){
  if (array[x].cname===catname){
    array.splice(x, 1);
    console.log(array[x]);
    console.log(catname);
  }

  x++
  setcatgetstate(array);
  
}
  }
 

  }


  return (
    <div>
      <h3>Delete cateogery</h3>
<span>{status}</span>
<form  onSubmit={handleSubmit}>
<label>
          select your cateogery:
          <br></br>
          <select className={Style.input} value={catname} onChange={setcatname}>
          <option hidden>--choose--</option>
           {catget.map((array)=>
           ( <option key={array._id} value={array.cname}>{array.cname}</option>))}
          </select>
        </label>
<br></br>
      
      <input className={Style.inputbutton} type="submit" />
    </form>
      
    </div>
  );
}

export default Deletecat;
