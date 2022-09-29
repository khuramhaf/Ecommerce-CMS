import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Style from './Style.module.css'


function Checkout(props) {

    const [groceryarray, setgroceryarray] = useState(null);
    const [linkstate1, setlinkstate1] = useState(null);

    var mydata = 2;

    useEffect(() => {
        var array1 = JSON.parse(window.localStorage.getItem('shoppingcart'));
        if(array1.length===0){
          array1 = null
        }
setgroceryarray(array1);
   
     

    }, []);


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
      setgroceryarray(array1);

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
          

          if(array1.length===0){
            array1=null;
          }
          setgroceryarray(array1);
      
      props.myfun(check3);
          
            }


            function senddata(){

              if (localStorage.getItem("logindetail") !== null){
                var getitem = localStorage.getItem("logindetail");
                var array1 = JSON.parse(window.localStorage.getItem('shoppingcart'));

                var myobj = {logindetail: getitem, dataarray: array1}

                fetch('http://localhost:8000/checkoutdata', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(myobj)
  })
    .then((res)=>res.json()).
    then((res1)=>console.log(res1))
  
              
              }

              else{
                console.log("you are not loged in");
              }
            }
if (groceryarray === null){
  return(
    <div>
      <h1>there is no item</h1>
    </div>
  );
}
   

else {
  
  return (
      <div>
        <div>
          {groceryarray.map((array)=>(
          <div className={Style.cards} key = {array._id}>
   <img className={Style.image} style= {{cursor:"pointer"}}  id = {array._id}  src = {array.image}/>
          <h3>{array.productname}</h3>
          <h3>Quantity: {array.quantity}</h3>
          <h3>Price: {array.price}</h3>
          <button onClick={cart}  id = {array._id}>add to cart</button>
          <button onClick={removecart} id = {array._id}>remove from cart</button>
          </div>))}
          </div>
          <div>
          <button className={Style.buttonsend1} onClick={senddata}>send</button>
          </div>
         
          </div>
           
        );
          }
  }
  
  export default Checkout;