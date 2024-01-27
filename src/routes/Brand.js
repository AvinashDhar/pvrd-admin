import { useState, useRef } from "react";
import { Form, useLoaderData, redirect } from "react-router-dom";
import axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const apiURL = process.env.REACT_APP_BASE_API_URL;

const Brand = () => {
    const brandImageRef = useRef(null);

    const [brandImage, setbrandImage] = useState('');
    const [brandImageURL, setbrandImageURL] = useState(null);
    const [brandName, setbrandName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const saveHandler = () => {
        if (brandName === '') {
            console.log("name is required!!!!");
            setError(true);
            setErrorMessage("Brand name is mandatory")
            setTimeout(() => {
                setError(false);
                setErrorMessage('');
            }, 3000);
            return;
        }
        let data = new FormData();
        brandImage && data.append("image", brandImage);
        data.set("name", brandName);
        setLoading(true);
        axios.post(`${apiURL}/api/v1/brands/`, data).then(
            res => {
                console.log(res.data);
                setSuccess(true);
                setSuccessMessage("Brand created successfully!");
                setTimeout(() => {
                    setSuccess(false);
                    setSuccessMessage('');
                }, 3000);
                setLoading(false);
            }).catch(err => {
                console.log(err);
                setError(true);
                setErrorMessage("Error while creating brand!")
                setTimeout(() => {
                    setError(false);
                    setErrorMessage('');
                }, 3000);
                setLoading(false);
            })

        return redirect(`/brand`);
    }

    const handleBrandImage = (e) => {
        setbrandImage(e.target.files[0]);
        setbrandImageURL(URL.createObjectURL(e.target.files[0]))
    }
    
    const handleRemoveBrandImage = () => {
        setbrandImageURL(null);
        setbrandImage('');
        brandImageRef.current.value = "";
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
                        <span>Brand Name:</span>
                        <input
                            type="text"
                            name="brandName"
                            placeholder="Brand Name"
                            required={true}
                            onChange={e => setbrandName(e.target.value)}
                            value={brandName}
                        />
                    </label>
                    <div style={{ marginTop: '20px' }}>
                        <span style={{ marginRight: '5px' }}>Brand image: </span>
                        <input ref={brandImageRef} onChange={e => handleBrandImage(e)} type='file' name='brandImage' />
                    </div>
                    <div>
                        {brandImageURL && (<img src={brandImageURL} height={50} width={50} />)}
                        {brandImageURL && (<button type="button" onClick={handleRemoveBrandImage} disabled={loading}>Remove</button>)}
                    </div>
                        <button type="button" onClick={saveHandler} disabled={loading}>Save</button>
                </form>
            </div>
        </>

    );
}

// export const loader = async ({ params }) => {

//     try {
//         const response = await axios.get(`${apiURL}/api/v1/brands/`);
//         let data = response.data.map(brand => {
//             return {
//                 label: brand.name,
//                 value: brand.id,
                
//             }
//         });
//         return { brands: data };
//     } catch (error) {
//         console.log("error while fetching brands", error);
//         return { brands: [] };
//     }
// }

export default Brand;