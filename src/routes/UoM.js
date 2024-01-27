import { useState, useRef } from "react";
import { redirect } from "react-router-dom";
import axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const apiURL = process.env.REACT_APP_BASE_API_URL;

const UoM = () => {
    const [uoMName, setUoMName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const saveHandler = () => {
        if (uoMName === '') {
            console.log("name is required!!!!");
            setError(true);
            setErrorMessage("UoM name is mandatory")
            setTimeout(() => {
                setError(false);
                setErrorMessage('');
            }, 3000);
            return;
        }
        let data = new FormData();
        data.set("name", uoMName);
        setLoading(true);
        axios.post(`${apiURL}/api/v1/uoms/`, data).then(
            res => {
                console.log(res.data);
                setSuccess(true);
                setSuccessMessage("UoM created successfully!");
                setTimeout(() => {
                    setSuccess(false);
                    setSuccessMessage('');
                }, 3000);
                setLoading(false);
            }).catch(err => {
                console.log(err);
                setError(true);
                setErrorMessage("Error while creating uoM!")
                setTimeout(() => {
                    setError(false);
                    setErrorMessage('');
                }, 3000);
                setLoading(false);
            })

        return redirect(`/uom`);
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
                        <span>UoM Name:</span>
                        <input
                            type="text"
                            name="UoMName"
                            placeholder="UoM Name"
                            required={true}
                            onChange={e => setUoMName(e.target.value)}
                            value={uoMName}
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
//         const response = await axios.get(`${apiURL}/api/v1/uoMs/`);
//         let data = response.data.map(uoM => {
//             return {
//                 label: uoM.name,
//                 value: uoM.id,
                
//             }
//         });
//         return { uoMs: data };
//     } catch (error) {
//         console.log("error while fetching uoMs", error);
//         return { uoMs: [] };
//     }
// }

export default UoM;