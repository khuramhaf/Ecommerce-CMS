import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router';
import React, {useState, useEffect } from 'react';


function Inner(props) {

    const { name } = useParams();
    
console.log(name);

  const [response, setresponse] = useState(null);


  useEffect(() => {
   
    
    var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      console.log(this.responseText);
      var d = this.responseText;

      if (d==="null"){
        setresponse(0);
      }

      else {
        console.log(this.responseText);
        setresponse(JSON.parse(this.responseText));
        
      }
    }
  };
  xhttp.open("POST", "http://localhost:8000/data1");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.setRequestHeader ('Accept', 'application / json');
  xhttp.send("data="+name);

  }, [name]);


  function cart(e){
    var array1 = JSON.parse(window.localStorage.getItem('shoppingcart'));
    var array2 = response;
    

    if(array1.length === 0){
array1.push(array2);
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

    array1.push(array2);
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


  if (response === null){
    return (
      <div>
       <h1>Loading....</h1>
      </div>
    );

  }

  if (response === 0){
    return (
      <div>
       <h1>this is not found</h1>
      </div>
    );

  }


  else {
    return (
      <div>
       <h1>{response._id}</h1>
       <h1>{response.price}</h1>
       <button onClick={cart} id = {response._id}>add to cart</button>
       <button onClick={removecart} id = {response._id}>remove from cart</button>
      </div>
    );

  }

 
}



export default Inner;