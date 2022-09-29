import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Style from './Style.module.css'

function Deleteproduct() {
  const [status, setstatus] = useState("");
  const [catget, setcatgetstate] = useState([]);
  const [catname, setcatnamestate] = useState("");
  const [groceryarray, setgroceryarray] = useState([]);
  const [productprice, setproductprice] = useState("");
  const [productname, setproductname] = useState("");
 
  function updateprice(event){
    
   setproductprice(event.target.value)

  
  }

  function updateproductname(event){
    setproductname(event.target.value)
  }


  function updateproduct(event){
    console.log(productprice)
    console.log(productname)
    console.log(event.target.id)
    console.log(catname);

    setstatus("")

    if(productprice !== "" && !isNaN(productprice)){

      var myobj = { _id: event.target.id, cname: catname, productprice: productprice};


    fetch(
        '/updateprodprice',
        
        {
            method: 'POST',
            body: JSON.stringify(myobj),
            headers: {
                
                'Content-Type': 'application/json',
              },
        }
    ).then((response) => response.json()).then((result)=>{console.log(result);})

    }

    

    else if(productname !== ""){

      var myobj = { _id: event.target.id, cname: catname, productname: productname};


      fetch(
          '/updateprodname',
          
          {
              method: 'POST',
              body: JSON.stringify(myobj),
              headers: {
                  
                  'Content-Type': 'application/json',
                },
          }
      ).then((response) => response.json()).then((result)=>{console.log(result);})
  }

  else{
    setstatus("please fill form properly")
  }
  }

  useEffect(() => {
    fetch ("/catget", {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
  
      })
    .then(x => x.json())
    .then(y => setcatgetstate(y));
  }, []);

  
  
  function setcatname(e){
setcatnamestate(e.target.value);

setstatus("");

var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var d = this.responseText;
        console.log(d);
        if (d==="null"){
          setstatus("there is no item")
          setgroceryarray([]);
        }
        else{
setgroceryarray(JSON.parse(this.responseText));
setstatus("");

        }
      }
    };
    xhttp.open("POST", "/cateogries");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("data="+e.target.value);

}


function deleteproduct1(e){

    
    const array2 = [...groceryarray];

    var counter = 0;

    while(counter<array2.length){
        if(array2[counter]._id === e.target.id){
array2.splice(counter, 1);
console.log("hello");
        }
        counter++;
    }
    
    setgroceryarray(array2);

    var myobj = { _id: e.target.id, cname: catname};


    fetch(
        '/delprod',
        
        {
            method: 'POST',
            body: JSON.stringify(myobj),
            headers: {
                
                'Content-Type': 'application/json',
              },
        }
    ).then((response) => response.json()).then((result)=>{console.log(result);})
    
    }
    





  function handleSubmit(event){
    event.preventDefault();

    

}


  return (
    <div className={Style.add}>
<div>
       
      <h2>Delete and update products</h2>

<form  onSubmit={handleSubmit}>
<label>
          select your cateogery:
          <br></br>
          <select className= {Style.input} value={catname} onChange={setcatname}>
          <option hidden>--choose--</option>
           {catget.map((array1)=>
           ( <option key={array1._id} value={array1.cname}>{array1.cname}</option>))}
          </select>
        </label>
<br></br>
    </form>
    </div>
<h4>{status}</h4>
    {groceryarray.map((array)=>(
          <div className={Style.cards} key = {array._id}>
   <img className={Style.image} style= {{cursor:"pointer"}}  id = {array._id}  src = {array.image}/>
         
   <h1 >{array._id}</h1>

   <label> product name
   <input id = {array._id}  type="text"  name = "text" defaultValue={array.productname}  onChange={updateproductname}/>
   </label>   
   <br></br>
   <label>price
   <input id = {array._id}  type="text"  name = "text" defaultValue={array.price}  onChange={updateprice}/>
   </label>
  
   
          <button onClick={deleteproduct1}   id = {array._id}>remove product</button>
          <button onClick={updateproduct}   id = {array._id}>update product</button>
          
          </div>))}
      
    </div>
  );
}

export default Deleteproduct;
