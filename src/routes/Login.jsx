import React, { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log('Username:', username, 'Password:', password,)
    }
    return (

        <div style={{ height: "100vh", backgroundColor: "whitesmoke", display:"flex", justifyContent:"center",alignItems:"center" }}>

            <div style={{height:"80%",backgroundColor:"white", width:"30%", borderRadius:"10px", border:"3px solid #D9E76C "}}>
                <div style={{textAlign:"center"}}>
                    <img src="pvrd-light.png" alt="pvrd logo" width="50%" height="50%" style={{padding:"5px"}} />
                </div>
                <hr  style={{}}/>
                <div style={{textAlign:"center"
                }}>

                    <form style={{color:"#025187"}}>
                        <h1 style={{}}>Login</h1>
                        <label style={{fontWeight:"700"}}>
                            Username:

                            <input
                                style={{padding:"5px",width:"50%",border:"2px solid #D9E76C",outline:"none"}}
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <br />
                        <br />
                        <label style={{fontWeight:"700"}}>
                            Password:
                            <input
                                style={{padding:"5px",width:"50%",border:"2px solid #D9E76C",outline:"none"}}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <br />
                        <br />
                        <button style={{padding:"5px",width:"70%",backgroundColor:"#D9E76C",color:"#025187", cursor:"pointer"}}
                            type="button" onClick={handleLogin}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Login



// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Fack() {
//     const [posts, setPosts] = useState([])
//     useEffect(() => {
//         axios.get('https://jsonplaceholder.typicode.com/posts')
//             .then(res => {
//                 alert(res)
//                 setPosts(res.data)
//             })
//             .catch(err => {
//                 alert(err)
//             }, [])
//     })
//     return (
//             <div> 
//                 <ul>
//                     {posts.map(post => <li key={post.id}>{post.title}</li>)}
//                 </ul>
//             </div>
//     )
// }

// export default Fack




