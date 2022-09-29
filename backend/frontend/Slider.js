import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Style from './Style.module.css'


function Slider() {
  const [status, setstatus] = useState("");
  const [productimage, setproductimagestate] = useState("");
  const [deletesliderimage, setdeletesliderimage] = useState([]);
  const [disablebutton, setdisablebutton] = useState(false);

  useEffect(() => {

    fetch ("/sliderget")
    .then(x => x.json())
    .then(y => setdeletesliderimage(y));
  }, []);

  
  
 


      function setproductimage(e){
        setproductimagestate(e.target.files[0]);
        
          }

          

              

                 

  function handleSubmit(event){
    event.preventDefault();
    if(productimage === "" ){

      setstatus("please fill out the form completely and correctly")
    }
    else{
      setstatus("");
      setdisablebutton(true);

      const formData1 = new FormData();

		formData1.append('file', productimage);
    formData1.append("upload_preset", "musktechbe");
    

		fetch(
			'https://api.cloudinary.com/v1_1/musk-technology/upload',
			{
				method: 'POST',
				body: formData1,
			}
		)
			.then((response) => response.json())
			.then((result1) => {

        const formData = new FormData();

		formData.append('image', productimage);
    formData.append('imageurl', result1.secure_url);

		fetch(
			'/slideradd',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				if(result.code === 48){
          setstatus("this data already exist");
        }

        setdisablebutton(false);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
				
			})

      

}
 

  }



  function deleteslider(e){

    
    console.log(e.target.id);
     
     const array2 = [...deletesliderimage];
 
     var counter = 0;
 
     while(counter<array2.length){
         if(array2[counter]._id === e.target.id){
 array2.splice(counter, 1);
 console.log("hello");
         }
         counter++;
     }
     
     setdeletesliderimage(array2);
 
     var myobj = { _id: e.target.id};

     console.log(myobj._id);
 
 
     fetch(
         '/delslider',
         
         {
             method: 'POST',
             body: JSON.stringify(myobj),
             headers: {
                 
                 'Content-Type': 'application/json',
               },
         }
     ).then((response) => response.json()).then((result)=>{console.log(result);})
     
     }
     


  return (
    <div className={Style.add}>
      <div>
<h2>Manage Slider</h2>
      <span>{status}</span>

<form  onSubmit={handleSubmit}>


        
      <label>upload a file (jpeg only):
        <br></br>
        <input type="file"  name = "newfile" onChange={setproductimage}/>
      </label>
      
      <br></br>
      <input className={Style.inputbutton} disabled={disablebutton} type="submit" />
    </form>

    {deletesliderimage.map((array)=>
           ( 
           <div className={Style.cards} key={array._id}>
           <img  className={Style.image}  src={array.image}></img>
           <button onClick={deleteslider} id={array._id}>delete image</button>
           </div>
           
           ))}
    </div>

    
      
    </div>
  );
}

export default Slider;
