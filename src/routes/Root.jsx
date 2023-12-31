import { Outlet, Link, NavLink } from "react-router-dom";

const Root = () => {
    return (
        <>
            <div style={{ width: '100%', height: '7vh', color: '#D9E76C', fontSize: '18px', fontWeight: '700', backgroundColor: '#025187', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ marginLeft: '15px' }}>
                    <img src="pvrd-light.png" alt="pvrd logo" width="130" height="100" />
                </div>
                <div style={{ marginRight: '20px' }}>PVRD Administration</div>
            </div>
            <div id="body-section">
                <div id="sidebar">
                    <nav>
                        <ul>
                            <li>
                                <NavLink
                                    to={`category`}
                                    className={({ isActive, isPending }) =>
                                    isActive
                                        ? "active"
                                        : isPending
                                        ? "pending"
                                        : ""
                                    }
                                >
                                    Category Manager
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`subcategory`}
                                    className={({ isActive, isPending }) =>
                                    isActive
                                        ? "active"
                                        : isPending
                                        ? "pending"
                                        : ""
                                    }
                                >
                                    Sub Category Manager
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`product`}
                                    className={({ isActive, isPending }) =>
                                    isActive
                                        ? "active"
                                        : isPending
                                        ? "pending"
                                        : ""
                                    }
                                >
                                    Product Manager
                                </NavLink>
                            </li>
                            
                        </ul>
                    </nav>
                </div>
                <div id="detail">
                    <Outlet />
                </div>
            </div>
            <div style={{width:'100%',height:'4vh', color:'#D9E76C', fontSize:'14px' ,fontWeight:'400', backgroundColor:'#025187', display:'flex',justifyContent:'center',alignItems:'center'}}>
                Copyright &copy; 2023, PVRD Administration, Powered by FlyingDevs Technologies LLP
            </div>

        </>
    );
}

export default Root;