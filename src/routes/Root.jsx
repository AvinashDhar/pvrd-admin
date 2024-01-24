import { Outlet, Link, NavLink } from "react-router-dom";
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PaletteIcon from '@mui/icons-material/Palette';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CategoryIcon from '@mui/icons-material/Category';
import HardwareIcon from '@mui/icons-material/Hardware';
import SegmentIcon from '@mui/icons-material/Segment';

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
                            style={{ textAlign: "center", color: "#fff" }}
                        >
                            <img src="pvrd-light.png" alt="pvrd logo" width="130" height="80" />
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
                    </Menu>
                </Sidebar>
                <div style={{ width: '100%' }}>
                    <main style={{ overflowY: 'scroll', height: '94vh' }}>
                        <div id="detail">
                            <Outlet />
                        </div>
                    </main>
                    <div style={{ width: '100%', height: '6vh', textAlign:'center', color: '#000', fontSize: '14px', fontWeight: '400', backgroundColor: '#ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{padding: '10px'}}>
                        Copyright &copy; 2023, PVRD Administration, Powered by FlyingDevs Technologies LLP
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Root;