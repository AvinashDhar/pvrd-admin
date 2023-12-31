import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css';

const apiURL = process.env.REACT_APP_BASE_API_URL;

function App() {
  //States for creating Category:
  const [categoryImage, setCategoryImage] = useState('');
  const [categoryName, setCategoryName] = useState('');

  //States for creating Product:
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productVariants, setProductVariants] = useState([]);
  const [productGallaryImages, setProductGallaryImages] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState('');
  const [productBrandName, setProductBrandName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/v1/categories/`);
        let data = response.data.map(category => {
          return {
            label: category.name,
            value: category.id
          }
        })
        setCategories(data)
      } catch (error) {
        console.log("error while fetching categories", error);
      }
    };
    fetchCategories();
  }, [success]);

  console.log("productvariants: ", productVariants)

  const handleCategoryCreate = () => {
    console.log("onsubmit handler getting called with data: ", categoryImage, categoryName)
    if (!categoryImage || categoryName === '') {
      console.log("no image selected!!!!");
      setError(true);
          setErrorMessage("Category name and image are mandatory")
          setTimeout(()=>{
            setError(false);
            setErrorMessage('');
          },3000);
      return;
    }
    let data = new FormData();
    data.append("image", categoryImage);
    data.set("name", categoryName);
    setLoading(true);
    axios.post(`${apiURL}/api/v1/categories/`, data).then(
      res => {
        console.log(res.data);
        setSuccess(true);
        setSuccessMessage("Category created successfully!");
        setTimeout(()=>{
          setSuccess(false);
          setSuccessMessage('');
        },3000);
        setLoading(false);  
      }).catch(err => {
        console.log(err);
        setError(true);
        setErrorMessage("Error while adding gallary photos to the newly created product!")
        setTimeout(()=>{
            setError(false);
            setErrorMessage('');
        },3000);
        setLoading(false);
      })
  }

  const handleProductCreate = () => {
    let invalidProductVariants = productVariants.some((variant => {return variant.size == '' || variant.colour == '' || variant.price == '' || variant.rewardPoint == ''}))
    if(productName === '' || productBrandName === '' || selectedCategory === '' || productImage == null || productVariants.length === 0 || invalidProductVariants){
      setError(true);
      setErrorMessage("Name, Category, Image and atleast 1 product variant is mandatory")
      setTimeout(()=>{
        setError(false);
        setErrorMessage('');
      },3000);
      return;
    }
    let data = new FormData();
    data.append("image", productImage);
    data.set("name", productName);
    data.set("brand",productBrandName);
    data.set("category", selectedCategory);
    data.set("productVariants", JSON.stringify(productVariants));
    setLoading(true);
    axios.post(`${apiURL}/api/v1/products/`, data).then(res => {
      console.log(res.data);
      if (productGallaryImages && res.data.id) {
        let galleryData = new FormData();
        for (let i = 0; i < productGallaryImages.length; i++) {
          galleryData.append(`images`, productGallaryImages[i]);
        }

        axios.put(`${apiURL}/api/v1/products/gallery-images/${res.data.id}`, galleryData).then(
          res => {
            console.log(res.data);
            setSuccess(true);
            setSuccessMessage("Product created successfully!");
            setTimeout(()=>{
              setSuccess(false);
              setSuccessMessage('');
            },3000);
            setLoading(false);
          }
        ).catch(err => {
          console.log("Error while adding gallary photos to the newly created product", err);
          setError(true);
          setErrorMessage("Error while adding gallary photos to the newly created product!")
          setTimeout(()=>{
            setError(false);
            setErrorMessage('');
          },3000);
          setLoading(false);
        })
      }
      else{
        setSuccess(true);
        setSuccessMessage("Product created successfully with no gallery image(s)");
        setTimeout(()=>{
          setSuccess(false);
          setSuccessMessage('');
        },3000);
        setLoading(false);
      }
      
    }).catch(err => {
      console.log("Error while creating product: ", err);
      setError(true);
          setErrorMessage("Error while creating product!")
          setTimeout(()=>{
            setError(false);
            setErrorMessage('');
          },3000);
      setLoading(false);
    })
  }

  const handleAddVariant = (e) => {
    e.preventDefault();
    setProductVariants([...productVariants, { colour: '', size: '', price: '', rewardPoint: '', description: '' }])
  }

  const handleVariantChange = (value, key, index) => {
    console.log("changing variant: ", value, key, index)
    let tempProductVariants = [...productVariants];
    tempProductVariants[index][key] = value;
    console.log("temmpproductvariants: ", tempProductVariants)
    setProductVariants(tempProductVariants);
  }

  const handleDeleteVariant = (index) => {
    let tempProductVariants = [...productVariants];
    tempProductVariants = tempProductVariants.filter((variant, i) => {
      return i != index;
    });
    setProductVariants(tempProductVariants);
  }



  return (
  <div>
    <div style={{width:'100%', height:'6vh', marginBottom:'15px', padding:'15px', color:'#D9E76C', fontSize:'18px' ,fontWeight:'700', backgroundColor:'#025187', display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{marginLeft:'15px'}}>
        <img src="pvrd-logo.png" alt="Girl in a jacket" width="130" height="100" />
      </div>
      <div style={{marginRight:'20px'}}>PVRD Administration</div>
    </div>
    <div style={{display:'flex',flexDirection:'column',padding:'5px', minHeight:'85vh',overflow:'auto', justifyContent:'space-evenly', alignItems:'center'}}>
      {error && (<Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {errorMessage}
      </Alert>)}
      {success && (<Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        {successMessage}
      </Alert>)}
      {loading && (
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      )}
      <div style={{display:'flex', flexDirection: 'column', alignItems:'flex-start',minWidth:'48%', justifyContent:'center'}}>

        <h3>Create Category</h3>
        
          <div>
            <span style={{marginRight:'5px'}}>Category Name: </span>
            <Input required={true} onChange={e => setCategoryName(e.target.value)} value={categoryName} placeholder='Enter Category Name' type='text' name='categoryName' />
          </div>

          <div style={{marginTop:'20px'}}>
            <span style={{marginRight:'5px'}}>Category image: </span>
            <input onChange={(e) => setCategoryImage(e.target.files[0])} type='file' name='categoryImage' />
          </div>
          <div style={{display:'flex', justifyContent:'flex-end', alignItems:'center', width:'100%', marginTop:'20px'}}>
            <Button variant="contained" 
              style={{
                  borderRadius: 35,
                  backgroundColor: "#025187",
                  padding: "15px 20px",
                  fontSize: "16px",
                  marginTop:'20px'
              }} 
              disabled={loading}
              onClick={()=> handleCategoryCreate()}
            >
              Create
            </Button>
          </div>

        <br />
        <br />
      </div>
      <div style={{display:'flex', flexDirection: 'column', alignItems:'flex-start',minWidth:'47%', justifyContent:'center'}}>
        <h3>Create Product</h3>
        <div>
        <span style={{marginRight:'5px'}}>Product Name: </span>
          <Input required={true} onChange={e => setProductName(e.target.value)} value={productName} placeholder='Enter Product Name' type='text' name='productName' />
        </div>
        <div style={{marginTop:'15px'}}>
        <span style={{marginRight:'5px'}}>Brand Name: </span>
          <Input required={true} onChange={e => setProductBrandName(e.target.value)} value={productBrandName} placeholder='Enter Brand Name' type='text' name='productBrandName' />
        </div>
        <div style={{marginTop:'15px'}}>
          <span style={{marginRight:'5px'}}>Product Image: </span>
          <input onChange={(e) => setProductImage(e.target.files[0])} type='file' name='productImage' />
        </div>
        <div style={{marginTop:'20px'}}>
          <span style={{marginRight:'5px'}}>Product Gallery Image: </span>
          <input onChange={(e) => setProductGallaryImages(e.target.files)} type='file' name='productGallaryImage' multiple />
        </div>
        <div style={{marginTop:'15px', display:'flex', justifyContent:'center', alignItems:'center',}}>
          <span style={{marginRight:'10px'}}>Category: </span>
        <FormControl>
          <InputLabel id="category-select">Choose Category</InputLabel>
          <Select
            style={{ width: '180px',height:'45px' }}
            labelId="category-select"
            id="select"
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories?.map((item, index) => (<MenuItem key={index} value={item.value}>{item.label}</MenuItem>))}
          </Select>
        </FormControl>
        </div>

        <br /><br />
        <><span>Product variants: </span>
          <Button variant="contained" 
            style={{
                borderRadius: 35,
                backgroundColor: "#025187",
                padding: "8px 12px",
                fontSize: "12px",
                marginTop:'10px',
                marginBottom:'10px',
            }} 
            disabled={loading}  
            onClick={(e) => handleAddVariant(e)}
          >Add variant</Button>

          {productVariants?.map((variant, index) => {

            return (<div key={index} style={{display:'flex', justifyContent:'flex-end', alignItems:'center',margin:'10px'}}>
              <Input required={true} type='text' name='colour' placeholder='Colour' value={productVariants[index].colour} onChange={(e) => { handleVariantChange(e.target.value, 'colour', index) }} />
              <Input required={true} type='text' name='size' placeholder='Size' value={productVariants[index].size} onChange={(e) => { handleVariantChange(e.target.value, 'size', index) }} />
              <Input required={true} type='number' name='price' placeholder='Price' value={productVariants[index].price} onChange={(e) => { handleVariantChange(e.target.value, 'price', index) }} />
              <Input required={true} type='number' name='rewardPoint' placeholder='Reward Point' value={productVariants[index].rewardPoint} onChange={(e) => { handleVariantChange(e.target.value, 'rewardPoint', index) }} />
              <Input type='text' name='description' placeholder='Description' value={productVariants[index].description} onChange={(e) => { handleVariantChange(e.target.value, 'description', index) }} />
              <DeleteRoundedIcon style={{cursor:'pointer'}} onClick={(e) => { handleDeleteVariant(index) }}/>
            </div>)
          })}
        </>
        <div style={{display:'flex', justifyContent:'flex-end', alignItems:'center', width:'100%'}}>
          <Button 
            variant="contained" 
            style={{
                borderRadius: 35,
                backgroundColor: "#025187",
                padding: "15px 20px",
                fontSize: "16px",
                marginTop:'20px'
            }} 
            disabled={loading} 
            onClick={()=>{handleProductCreate()}}
          >
            Create
          </Button>
        </div>
      </div>
      
    </div>
    <div style={{width:'100%',height:'4vh',marginTop:'15px', padding:'5px', color:'#D9E76C', fontSize:'14px' ,fontWeight:'400', backgroundColor:'#025187', display:'flex',justifyContent:'center',alignItems:'center'}}>

      Copyright &copy; 2023, PVRD Administration, Powered by FlyingDevs Technologies LLP
    </div>
  </div>
  );
}

export default App;
