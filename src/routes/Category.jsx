import { useState } from "react";
import { Form, useLoaderData, redirect } from "react-router-dom";
import axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const apiURL = process.env.REACT_APP_BASE_API_URL;

const Category = () => {
    const { categories } = useLoaderData();
    console.log("categories inside category comp: ", categories)
    const [categoryImage, setCategoryImage] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const saveHandler = () => {
        if (categoryName === '') {
            console.log("name is required!!!!");
            setError(true);
            setErrorMessage("Category name is mandatory")
            setTimeout(() => {
                setError(false);
                setErrorMessage('');
            }, 3000);
            return;
        }
        let data = new FormData();
        categoryImage && data.append("image", categoryImage);
        data.set("name", categoryName);
        setLoading(true);
        axios.post(`${apiURL}/api/v1/categories/`, data).then(
            res => {
                console.log(res.data);
                setSuccess(true);
                setSuccessMessage("Category created successfully!");
                setTimeout(() => {
                    setSuccess(false);
                    setSuccessMessage('');
                }, 3000);
                setLoading(false);
            }).catch(err => {
                console.log(err);
                setError(true);
                setErrorMessage("Error while creating category!")
                setTimeout(() => {
                    setError(false);
                    setErrorMessage('');
                }, 3000);
                setLoading(false);
            })

        return redirect(`/category`);
    }

    const resetHandler = () => {

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
                    <label className="dataField">
                        <span>Category Name:</span>
                        <input
                            type="text"
                            name="categoryName"
                            placeholder="Category Name"
                            required={true}
                            onChange={e => setCategoryName(e.target.value)}
                            value={categoryName}
                        />
                    </label>
                    <div style={{ marginTop: '20px' }}>
                        <span style={{ marginRight: '5px' }}>Category image: </span>
                        <input onChange={(e) => setCategoryImage(e.target.files[0])} type='file' name='categoryImage' />
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
                value: category.id,
                subCategories: category.subCategories,
            }
        });
        return { categories: data };
    } catch (error) {
        console.log("error while fetching categories", error);
        return { categories: [] };
    }
}

export default Category;