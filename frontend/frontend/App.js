
import './App.css';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Nav from './Nav'
import Products from './Products';
import Home from './Home'
import Inner from './Inner'
import Checkout from './Checkout'
import Notfound from './Notfound'
import Slider from "./Slider"
import Login from './Login'
import Loginbutton from './Loginbutton'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

if (localStorage.getItem("shoppingcart") === null){
  var x = [];
  window.localStorage.setItem('shoppingcart', JSON.stringify(x));

}



function App() {

  const [total, settotal] = useState(0);

  useEffect(() => {
    var array1 = JSON.parse(window.localStorage.getItem('shoppingcart'));
    var counter2 = 0;
  var check3 = 0;
  
  while(counter2<array1.length){
  
    var check0 = parseInt(array1[counter2].price);
    var check1 = parseInt(array1[counter2].quantity)
  
    var check2 = check0*check1;
    check3 = check3 + check2;
    counter2++;
  }
  settotal(check3);

 

}, []);
  function myfun(total1){
settotal(total1)
  }

 

  return (
    <div>
     <Loginbutton />
    <Nav mytotal={total} />
    <Slider/>
      <Routes>
      <Route path="/"  element={<Home />} />
     
            <Route path="/login" element={''} />
            
            

    <Route path="/:name" element={<Products myfun={myfun} />} />
    <Route path="/:name/:name" element={<Inner myfun={myfun} />} />
    <Route path="/checkout" element={<Checkout myfun={myfun} />} />
    <Route path="*" element={<Notfound />} />
  </Routes>
    </div>
  );
}

export default App;