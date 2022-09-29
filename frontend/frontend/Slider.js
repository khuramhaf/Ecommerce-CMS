import './App.css';
import React, { useState, useEffect } from 'react';

var data = 
        {
          _id: "6313334399c52529c8c6884d",
          image: 'https://res.cloudinary.com/musk-technology/image/upload/v1662202691/ebctymfdqyup73ycrmgx.jpg'
        }


function Slider() {

    var x = 0;

  const [sliderarray, setsliderarray] = useState(null);
  const [sliderimage, setsliderimage] = useState(null);
  const [slidercount, setslidercounter] = useState(1);


  function setimage(){

   

    
    
  }


  useEffect(() => {

    fetch ("/sliderget")
    .then(x => x.json())
    .then(y => {
      if (y.code==="null"){
        setsliderarray(null)
      }
      else{
      setsliderarray(y)
  }})
    
}, []);

 
  useEffect(() => { 
   const id = window.setInterval(() => {

        var arrayset = sliderarray;

        if(arrayset===null){


        }
        else{
            var array = sliderarray;
        setsliderimage(array[x]);
        x++;
        if (x===array.length){
x=0;
        }
        }
   
       }, 4000);

       return () => {
        clearInterval(id);
      };

  }, [sliderarray]);

  

if (sliderimage===null){
    return(
        <div>
            loading...
        </div>
    );
}
else{
  return (
    <div>
    
  <img src={sliderimage.image}  />
   
    </div>
  );
}
}

export default Slider;