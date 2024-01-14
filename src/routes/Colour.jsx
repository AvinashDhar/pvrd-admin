import { useState, useRef } from "react";
import { Form, useLoaderData, redirect } from "react-router-dom";
import axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const apiURL = process.env.REACT_APP_BASE_API_URL;

const Colour = () => {
    const colourImageRef = useRef(null);

    const [colourImage, setcolourImage] = useState('');
    const [colourImageURL, setcolourImageURL] = useState(null);
    const [colourName, setcolourName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const saveHandler = () => {
        if (colourName === '') {
            console.log("name is required!!!!");
            setError(true);
            setErrorMessage("Colour name is mandatory")
            setTimeout(() => {
                setError(false);
                setErrorMessage('');
            }, 3000);
            return;
        }
        let data = new FormData();
        colourImage && data.append("image", colourImage);
        data.set("name", colourName);
        setLoading(true);
        axios.post(`${apiURL}/api/v1/colours/`, data).then(
            res => {
                console.log(res.data);
                setSuccess(true);
                setSuccessMessage("Colour created successfully!");
                setTimeout(() => {
                    setSuccess(false);
                    setSuccessMessage('');
                }, 3000);
                setLoading(false);
            }).catch(err => {
                console.log(err);
                setError(true);
                setErrorMessage("Error while creating colour!")
                setTimeout(() => {
                    setError(false);
                    setErrorMessage('');
                }, 3000);
                setLoading(false);
            })

        return redirect(`/colour`);
    }

    const handleColourImage = (e) => {
        setcolourImage(e.target.files[0]);
        setcolourImageURL(URL.createObjectURL(e.target.files[0]))
    }
    
    const handleRemoveColourImage = () => {
        setcolourImageURL(null);
        setcolourImage('');
        colourImageRef.current.value = "";
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
                        <span>Colour Name:</span>
                        <input
                            type="text"
                            name="colourName"
                            placeholder="Colour Name"
                            required={true}
                            onChange={e => setcolourName(e.target.value)}
                            value={colourName}
                        />
                    </label>
                    <div style={{ marginTop: '20px' }}>
                        <span style={{ marginRight: '5px' }}>Colour image: </span>
                        <input ref={colourImageRef} onChange={e => handleColourImage(e)} type='file' name='colourImage' />
                    </div>
                    <div>
                        {colourImageURL && (<img src={colourImageURL} height={50} width={50} />)}
                        {colourImageURL && (<button type="button" onClick={handleRemoveColourImage} disabled={loading}>Remove</button>)}
                    </div>
                        <button type="button" onClick={saveHandler} disabled={loading}>Save</button>
                </form>
            </div>
        </>

    );
}

// export const loader = async ({ params }) => {

//     try {
//         const response = await axios.get(`${apiURL}/api/v1/colours/`);
//         let data = response.data.map(colour => {
//             return {
//                 label: colour.name,
//                 value: colour.id,
                
//             }
//         });
//         return { colours: data };
//     } catch (error) {
//         console.log("error while fetching colours", error);
//         return { colours: [] };
//     }
// }

export default Colour;