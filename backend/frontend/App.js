import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Addproduct from './Addproduct';
import Managecat from './Managecat'
import Deleteproduct from './Deleteproduct';
import Slider from './Slider';
import { Routes, Route, Link } from "react-router-dom";
import Style from './Style.module.css'


function App() {
  


  return (
    <div>

      <div className={Style.link}>
<ul>
<Link style={{ textDecoration: 'none' }}  to="managecat"><li className= {Style.example} >manage cateogery</li></Link>

<Link style={{ textDecoration: 'none' }}  to="addproduct"><li className={Style.example}>add product</li></Link>
<Link style={{ textDecoration: 'none' }}  to="manageproduct"><li className={Style.example} >manage products</li></Link>
<Link style={{ textDecoration: 'none' }}  to="manageslider"><li className={Style.example}>manage slider</li></Link>

</ul>
</div>
<div className={Style.route}>
    <Routes>
    <Route path="managecat" element={<Managecat />} />
        <Route path="addproduct" element={<Addproduct />} />
        <Route path="manageproduct" element={ <Deleteproduct />} />
        <Route path="manageslider" element={ <Slider />} />
       
      </Routes>
      </div>
    </div>
  );
}

export default App;
