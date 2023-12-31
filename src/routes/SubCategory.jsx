import { useState, useRef } from "react";
import { Form, useLoaderData, redirect } from "react-router-dom";
import axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const apiURL = process.env.REACT_APP_BASE_API_URL;

const SubCategory = () => {
    const { categories } = useLoaderData();
    const subCategoryImageRef = useRef(null);

    const [subCategoryImage, setSubCategoryImage] = useState('');
    const [subCategoryImageURL, setSubCategoryImageURL] = useState(null);
    const [subCategoryName, setSubCategoryName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    console.log("selected category: ", selectedCategory)
    const saveHandler = () => {
        if (subCategoryName === '' || selectedCategory === '') {
            console.log("Subcategory Name and Category are required!");
            setError(true);
            setErrorMessage("Subcategory Name and Category are required!")
            setTimeout(() => {
                setError(false);
                setErrorMessage('');
            }, 3000);
            return;
        }
        let data = new FormData();
        subCategoryImage && data.append("image", subCategoryImage);
        data.set("name", subCategoryName);
        data.set("category", selectedCategory);
        setLoading(true);
        axios.post(`${apiURL}/api/v1/subCategories/`, data).then(
            res => {
                console.log(res.data);
                setSuccess(true);
                setSuccessMessage("Subcategory created successfully!");
                setTimeout(() => {
                    setSuccess(false);
                    setSuccessMessage('');
                }, 3000);
                setLoading(false);
            }).catch(err => {
                console.log(err);
                setError(true);
                setErrorMessage("Error while creating subcontract!")
                setTimeout(() => {
                    setError(false);
                    setErrorMessage('');
                }, 3000);
                setLoading(false);
            })

        return redirect(`/category`);
    }

    const handleSubCategoryImage = (e) => {
        setSubCategoryImage(e.target.files[0]);
        setSubCategoryImageURL(URL.createObjectURL(e.target.files[0]))
    }
    
    const handleRemoveSubCategoryImage = () => {
        setSubCategoryImageURL(null);
        setSubCategoryImage('');
        subCategoryImageRef.current.value = "";
    }

    return (
        <>
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
            <div id="product">
                <form id="product-form">
                    <label>
                        <span>Subcategory Name:</span>
                        <input
                            type="text"
                            name="subCategoryName"
                            placeholder="Subcategory Name"
                            required={true}
                            onChange={e => setSubCategoryName(e.target.value)}
                            value={subCategoryName}
                        />
                    </label>
                    <div style={{ marginTop: '20px' }}>
                        <span style={{ marginRight: '5px' }}>Subcategory image: </span>
                        <input ref={subCategoryImageRef} onChange={(e) => handleSubCategoryImage(e)} type='file' name='subCategoryImage' />
                    </div>
                    <div>
                        {subCategoryImageURL && (<img src={subCategoryImageURL} height={50} width={50} />)}
                        {subCategoryImageURL && (<button type="button" onClick={handleRemoveSubCategoryImage} disabled={loading}>Remove</button>)}
                    </div>
                    <div className="dataField">
                        <span style={{ marginRight: '5px' }}>Choose Category: </span>
                        <FormControl>
                            <InputLabel id="category-select">Category</InputLabel>
                            <Select
                                style={{ width: '180px', height: '45px' }}
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
                        <button type="button" onClick={saveHandler} disabled={loading}>Save</button>
                </form>
            </div>
        </>

    );
}

export const loader = async ({ params }) => {

    try {
        const response = await axios.get(`${apiURL}/api/v1/categories/`);
        let data = response.data.map(category => {
            return {
                label: category.name,
                value: category.id
            }
        });
        return { categories: data };
    } catch (error) {
        console.log("error while fetching categories", error);
        return { categories: [] };
    }
}

export default SubCategory;