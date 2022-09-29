import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Style from './Style.module.css'


function Addproduct() {
  const [status, setstatus] = useState("");
  const [catget, setcatgetstate] = useState([]);
  const [catname, setcatnamestate] = useState("");
  const [productid, setproductidstate] = useState("");
  const [productimage, setproductimagestate] = useState("");
  const [productprice, setproductpricestate] = useState("");
  const [productnames, setproductnamestate] = useState("");
  const [productquantity, setproductquantitystate] = useState(1);
  const [disablebutton, setdisablebutton] = useState(false);

  useEffect(() => {
    fetch ("/catget")
    .then(x => x.json())
    .then(y => setcatgetstate(y));
  }, []);

  
  
  function setcatname(e){
setcatnamestate(e.target.value);
console.log(e.target.value);
}

function setproductid(e){
    setproductidstate(e.target.value);
    
      }

      function setproductimage(e){
        setproductimagestate(e.target.files[0]);
        
          }

          function setproductprice(e){
            setproductpricestate(e.target.value);
            
              }

              function setproductname(e){
                setproductnamestate(e.target.value);
                
                  }

                  function setproductquantity(e){
                    setproductquantitystate(e.target.value);
                    
                      }

  function handleSubmit(event){
    event.preventDefault();
    if(catname === "" || productid === "" || productprice === "" || productnames === ""
    || productquantity === "" || productimage === "" || productimage.type !== "image/jpeg" || isNaN(productprice) || isNaN(productquantity)){

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
    formData.append('cat', catname);
    formData.append('_id', productid);
    formData.append('price', productprice);
    formData.append('productname', productnames);
    formData.append('quantity', productquantity);

		fetch(
			'/prodadd',
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


  return (
    <div className={Style.add}>
      <div>
<h2>Add product</h2>
      <span>{status}</span>

<form  onSubmit={handleSubmit}>
<label>
          Select the cateogery:
          <br></br>
          <select className= {Style.input}  onChange={setcatname}>
          <option hidden>--choose--</option>
           {catget.map((array)=>
           ( <option key={array._id} value={array.cname}>{array.cname}</option>))}
          </select>
        </label>

        <br></br>
      <label>
      <br></br>
        <input placeholder='Product id (Must be unique)' className= {Style.input} type="text" onChange={setproductid}/>
      </label>
      <br></br>
      <br></br>
      <label>upload a file (jpeg only):
      <br></br>
        <input className= {Style.input} type="file"  name = "newfile" onChange={setproductimage}/>
      </label>
      <br></br>
      <label>
      <br></br>
        <input placeholder='Product price (numbers only)' className= {Style.input} type="text" onChange={setproductprice}/>
      </label>
      <br></br>
      <label>
      <br></br>
        <input placeholder='Product name' className= {Style.input} type="text" onChange={setproductname}/>
      </label>
      <br></br>
      
      <input className={Style.inputbutton} disabled={disablebutton} type="submit" />
    </form>
    </div>

    
      
    </div>
  );
}

export default Addproduct;
