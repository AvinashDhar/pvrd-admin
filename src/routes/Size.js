import { useState, useRef } from "react";
import { redirect } from "react-router-dom";
import axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const apiURL = process.env.REACT_APP_BASE_API_URL;

const Size = () => {
    const [sizeName, setSizeName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const saveHandler = () => {
        if (sizeName === '') {
            console.log("name is required!!!!");
            setError(true);
            setErrorMessage("Size name is mandatory")
            setTimeout(() => {
                setError(false);
                setErrorMessage('');
            }, 3000);
            return;
        }
        let data = new FormData();
        data.set("name", sizeName);
        setLoading(true);
        axios.post(`${apiURL}/api/v1/sizes/`, data).then(
            res => {
                console.log(res.data);
                setSuccess(true);
                setSuccessMessage("Size created successfully!");
                setTimeout(() => {
                    setSuccess(false);
                    setSuccessMessage('');
                }, 3000);
                setLoading(false);
            }).catch(err => {
                console.log(err);
                setError(true);
                setErrorMessage("Error while creating size!")
                setTimeout(() => {
                    setError(false);
                    setErrorMessage('');
                }, 3000);
                setLoading(false);
            })

        return redirect(`/size`);
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
                        <span>Size Name:</span>
                        <input
                            type="text"
                            name="sizeName"
                            placeholder="Size Name"
                            required={true}
                            onChange={e => setSizeName(e.target.value)}
                            value={sizeName}
                        />
                    </label>
                        <button type="button" onClick={saveHandler} disabled={loading}>Save</button>
                </form>
            </div>
        </>

    );
}

// export const loader = async ({ params }) => {

//     try {
//         const response = await axios.get(`${apiURL}/api/v1/sizes/`);
//         let data = response.data.map(size => {
//             return {
//                 label: size.name,
//                 value: size.id,
                
//             }
//         });
//         return { sizes: data };
//     } catch (error) {
//         console.log("error while fetching sizes", error);
//         return { sizes: [] };
//     }
// }

export default Size;