import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const apiURL = process.env.REACT_APP_BASE_API_URL;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set("email", email);
        data.set("password", password);
        console.log("avinash", email, password)
        try {
            setLoading(true);
            axios.post(`${apiURL}/api/v1/users/login`, data).then(res => {
                console.log(res);
                localStorage.setItem('authToken', JSON.stringify(res.data));
                navigate('/')
                setLoading(false);
            }).catch(err => {
                console.log(err);
                setError(true);
                setLoading(false)
                setErrorMessage("Email or Password is invalid!")
                setTimeout(() => {
                    setError(false);
                    setErrorMessage('');
                }, 3000);
            });
        }
        catch {
            console.log("inside catch");
        }
    }
    return (<>
        <div className={styles['login-form-wrapper']}>
            {error && (<Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {errorMessage}
            </Alert>)}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img className={styles['login-img']} src="pvrd-light.png" alt="logo" />
            </div>

            <div className={styles['login-title']} >Sign In</div>
            <form onSubmit={e => handleSubmit(e)}>
                <div className={styles['login-form-control']}>
                    <span>Email or phone number</span>
                    <div>
                    <input
                        style={{ margin: '5px 0' }}
                        type="text"
                        required
                        placeholder="Email or phone number"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    </div>
                    
                </div>
                <div className={styles['login-form-control']}>
                    <span>Password</span>
                    <div>
                    <input
                        style={{ margin: '5px 0' }}
                        type="password"
                        required
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    </div>
                    
                </div>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <button style={{padding:'15px 50px'}} disabled={loading} type="submit">{loading ? "Loading...": "Sign In" }</button>
                </div>  
            </form>
            <small style={{ textAlign: 'center' }}>
                This Site is intented to be used only by PVRD Administration.
            </small>
        </div>
    </>)
}
export default Login