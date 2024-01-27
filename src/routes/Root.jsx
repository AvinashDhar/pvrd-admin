import { Outlet, Link, NavLink, useNavigate,useLocation } from "react-router-dom";
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PaletteIcon from '@mui/icons-material/Palette';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CategoryIcon from '@mui/icons-material/Category';
import HardwareIcon from '@mui/icons-material/Hardware';
import SegmentIcon from '@mui/icons-material/Segment';
import ApprovalIcon from '@mui/icons-material/Approval';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import { useEffect } from "react";

const Root = () => {
    const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();
    const navlinkStyle = ({ isActive, isPending, isTransitioning }) => {
        return {
            textDecoration: 'none',
            fontWeight: "bold",
            color: isPending ? "#0e92ec" : isActive ? "#D9E76C" : "#fff",
            viewTransitionName: isTransitioning ? "slide" : "",
        };
    };
    
    const navigate = useNavigate();
    let location = useLocation();
    useEffect(()=> {
        let authData = JSON.parse(localStorage.getItem('authToken'));
        console.log(authData?.token)
        if(!authData?.token){
            navigate("/login");
        }
    },[location]);

    // const toggle = () => {
    //     toggleSidebar();
    //     if (toggled) {
    //         console.log(true);
    //         collapseSidebar();
    //     } else {
    //         console.log(false);
    //         collapseSidebar();
    //     }
    // };
    return (
        <>

            <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
                <Sidebar
                    style={{ height: "100vh", border: 'none' }}
                    backgroundColor="#025187"
                >
                    <Menu>
                        <MenuItem
                            //icon={toggled ? <ArrowCircleRightIcon /> : <ArrowCircleLeftIcon />}
                            icon={<MenuOutlinedIcon />}
                            onClick={() => {
                                //toggle();
                                collapseSidebar();
                            }}
                            style={{ textAlign: "center", color: "#fff", paddingTop:'10px' }}
                        >
                            <img src="pvrd-light.png" alt="pvrd logo" width="120" height="80" />
                        </MenuItem>
                        <NavLink
                            to={`product`}
                            className={({ isActive, isPending }) =>
                                isActive
                                    ? "active"
                                    : isPending
                                        ? "pending"
                                        : ""
                            }
                            style={navlinkStyle}
                        >
                            <MenuItem icon={<HardwareIcon />}>Product Manager</MenuItem>
                        </NavLink>
                        <NavLink
                            to={`category`}
                            className={({ isActive, isPending }) =>
                                isActive
                                    ? "active"
                                    : isPending
                                        ? "pending"
                                        : ""
                            }
                            style={navlinkStyle}
                        >
                            <MenuItem icon={<CategoryIcon />}>Category Manager</MenuItem>
                        </NavLink>
                        <NavLink
                            to={`subcategory`}
                            className={({ isActive, isPending }) =>
                                isActive
                                    ? "active"
                                    : isPending
                                        ? "pending"
                                        : ""
                            }
                            style={navlinkStyle}
                        >
                            <MenuItem icon={<SegmentIcon />}>Subcategory Manager</MenuItem>
                        </NavLink>
                        <NavLink
                            to={`productList`}
                            className={({ isActive, isPending }) =>
                                isActive
                                    ? "active"
                                    : isPending
                                        ? "pending"
                                        : ""
                            }
                            style={navlinkStyle}
                        >
                            <MenuItem icon={<ListAltIcon />}>Product List</MenuItem>
                        </NavLink>
                        <NavLink
                            to={`colour`}
                            className={({ isActive, isPending }) =>
                                isActive
                                    ? "active"
                                    : isPending
                                        ? "pending"
                                        : ""
                            }
                            style={navlinkStyle}
                        >
                            <MenuItem icon={<PaletteIcon />}>Colour Manager</MenuItem>
                        </NavLink>
                        <NavLink
                            to={`brand`}
                            className={({ isActive, isPending }) =>
                                isActive
                                    ? "active"
                                    : isPending
                                        ? "pending"
                                        : ""
                            }
                            style={navlinkStyle}
                        >
                            <MenuItem icon={<ApprovalIcon />}>Brand Manager</MenuItem>
                        </NavLink>
                        <NavLink
                            to={`size`}
                            className={({ isActive, isPending }) =>
                                isActive
                                    ? "active"
                                    : isPending
                                        ? "pending"
                                        : ""
                            }
                            style={navlinkStyle}
                        >
                            <MenuItem icon={<FormatSizeIcon />}>Size Manager</MenuItem>
                        </NavLink>
                        <NavLink
                            to={`uom`}
                            className={({ isActive, isPending }) =>
                                isActive
                                    ? "active"
                                    : isPending
                                        ? "pending"
                                        : ""
                            }
                            style={navlinkStyle}
                        >
                            <MenuItem icon={<AdUnitsIcon />}>UoM Manager</MenuItem>
                        </NavLink>
                    </Menu>
                </Sidebar>
                <div style={{ width: '100%' }}>
                    <main style={{ overflowY: 'scroll', height: '94vh' }}>
                        <div id="detail">
                            <Outlet />
                        </div>
                    </main>
                    <div style={{ width: '100%', height: '6vh', textAlign: 'center', color: '#000', fontSize: '14px', fontWeight: '400', backgroundColor: '#ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ padding: '10px' }}>
                            Copyright &copy; 2023, PVRD Administration, Powered by FlyingDevs Technologies LLP
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Root;