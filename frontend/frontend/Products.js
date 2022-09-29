import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Style from './Style.module.css'
import { useParams } from 'react-router';


function Products(props) {

    const [groceryarray, setgroceryarray] = useState(null);
    const [linkstate1, setlinkstate1] = useState(null);

    const { name } = useParams();

    useEffect(() => {
      setgroceryarray(null);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var d = this.responseText;
  
        if (d==="null"){
          setgroceryarray(0);
        }
  
        else {
          setgroceryarray(JSON.parse(this.responseText));
          console.log(this.responseText);
        }
      }
    };
    xhttp.open("POST", "http://localhost:8000/cateogries");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("data="+name);

    }, [name]);


    function cart(e){
      var array1 = JSON.parse(window.localStorage.getItem('shoppingcart'));
      var array2 = groceryarray;
      

      if(array1.length === 0){

        var counter5 = 0;
    while(counter5<array2.length){
      if(array2[counter5]._id === e.target.id){
        array1.push(array2[counter5]);
      }
      counter5++; 
    }
 }
  else {
    var flag = 0;

    var counter = 0;
while(counter<array1.length){
if (array1[counter]._id === e.target.id){
var quantity = parseInt(array1[counter].quantity);
  var quantity1 = quantity + 1;
  array1[counter].quantity = quantity1;
  flag = 0;
  break;
}
else{
  flag = 1;
}
counter++;
}

if (flag ===1){

  var counter1 = 0;
  while(counter1<array2.length){
    if(array2[counter1]._id === e.target.id){
      array1.push(array2[counter1]);
    }
    counter1++; 
  }
}
  
}
  
  
  var counter2 = 0;
  var check3 = 0;
  
  while(counter2<array1.length){
  
    var check0 = parseInt(array1[counter2].price);
    var check1 = parseInt(array1[counter2].quantity)
  
    var check2 = check0*check1;
    check3 = check3 + check2;
    counter2++;
  }
  window.localStorage.clear('shoppingcart');
      window.localStorage.setItem('shoppingcart', JSON.stringify(array1));

      console.log(JSON.parse(window.localStorage.getItem('shoppingcart')));
      console.log(check3);
      props.myfun(check3);
      
        }


        function removecart(e){
          var array1 = JSON.parse(window.localStorage.getItem('shoppingcart'));
          
      
          var counter = 0;
      while(counter<array1.length){
      if (array1[counter]._id === e.target.id){
      var quantity = parseInt(array1[counter].quantity);
      if(quantity>1){
        var quantity1 = quantity - 1;
        array1[counter].quantity = quantity1;
      }
  
      else{
        array1.splice(counter, 1)
      }
       
    }
    counter++;
  }
      
      
      var counter2 = 0;
      var check3 = 0;
      
      while(counter2<array1.length){
      
        var check0 = parseInt(array1[counter2].price);
        var check1 = parseInt(array1[counter2].quantity)
      
        var check2 = check0*check1;
        check3 = check3 + check2;
        counter2++;
      }
      
      
      
          window.localStorage.clear('shoppingcart');
          window.localStorage.setItem('shoppingcart', JSON.stringify(array1));
          console.log(JSON.parse(window.localStorage.getItem('shoppingcart')));
      console.log(check3);
      props.myfun(check3);
          
            }
if (groceryarray === null){
  return(
    <div>
      <h1>Loading....</h1>
    </div>
  );
}

if (groceryarray === 0){
    return(
      <div>
        <h1>There is no page found</h1>
      </div>
    );
  }
   

else {
  
  return (
      <div>
          
          {groceryarray.map((array)=>(
          <div className={Style.cards} key = {array._id}>
   <span > <Link id={array._id} to={array._id} state={groceryarray}>    <img className={Style.image} style= {{cursor:"pointer"}}  id = {array._id}  src = {array.image}/></Link></span>
          <h3>{array.productname}</h3>
          <h3>Price: {array.price}</h3>
          <button onClick={cart}  id = {array._id}>add to cart</button>
          <button onClick={removecart} id = {array._id}>remove from cart</button>
          </div>))}
          
          
          </div>
           
        );
          }
  }
  
  export default Products;