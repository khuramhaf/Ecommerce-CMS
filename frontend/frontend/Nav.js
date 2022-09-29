import { Link } from "react-router-dom";
import Style from './Style.module.css'
import React, { useState, useEffect } from 'react';


function Nav(props) {

  const [navdata, setnavdata] = useState(null);
  

  useEffect(() => {
    fetch ("http://localhost:8000/nav")
.then(x => x.json())
.then(y => setnavdata(y));
  }, []);
  
if (navdata === null){
  return(
    <div>Loading Nav...</div>
  )
}

else{
  return (
    <div>

      {navdata.map((array)=>(
      
      <Link key={array._id} to={array.cname}><button className={Style.buttonchange} >{array.cname}</button></Link>
      
      )
      )}
    
    
   
    <Link to="checkout"><button className={Style.buttonsend1}>ShoppingCart</button></Link>
   
    <span className={Style.total}>Total: {props.mytotal}</span>
    <div className={Style.smallscreentotal}>Total: {props.mytotal}</div>
     
    </div>
  );
}
}

export default Nav;