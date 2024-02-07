// import { Outlet, Link, NavLink, useNavigate,useLocation } from "react-router-dom";
// import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import PaletteIcon from '@mui/icons-material/Palette';
//import ListAltIcon from '@mui/icons-material/ListAlt';
// import CategoryIcon from '@mui/icons-material/Category';
// import HardwareIcon from '@mui/icons-material/Hardware';
// import SegmentIcon from '@mui/icons-material/Segment';
// import ApprovalIcon from '@mui/icons-material/Approval';
// import FormatSizeIcon from '@mui/icons-material/FormatSize';
// import AdUnitsIcon from '@mui/icons-material/AdUnits';
// import { useEffect } from "react";

// const Root = () => {
//     const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();
//     const navlinkStyle = ({ isActive, isPending, isTransitioning }) => {
//         return {
//             textDecoration: 'none',
//             fontWeight: "bold",
//             color: isPending ? "#0e92ec" : isActive ? "#D9E76C" : "#fff",
//             viewTransitionName: isTransitioning ? "slide" : "",
//         };
//     };

//     const navigate = useNavigate();
//     let location = useLocation();
//     useEffect(()=> {
//         let authData = JSON.parse(localStorage.getItem('authToken'));
//         console.log(authData?.token)
//         if(!authData?.token){
//             navigate("/login");
//         }
//     },[location]);

//     // const toggle = () => {
//     //     toggleSidebar();
//     //     if (toggled) {
//     //         console.log(true);
//     //         collapseSidebar();
//     //     } else {
//     //         console.log(false);
//     //         collapseSidebar();
//     //     }
//     // };
//     return (
//         <>

//             <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
//                 <Sidebar
//                     style={{ height: "100vh", border: 'none' }}
//                     backgroundColor="#025187"
//                 >
//                     <Menu>
//                         <MenuItem
//                             //icon={toggled ? <ArrowCircleRightIcon /> : <ArrowCircleLeftIcon />}
//                             icon={<MenuOutlinedIcon />}
//                             onClick={() => {
//                                 //toggle();
//                                 collapseSidebar();
//                             }}
//                             style={{ textAlign: "center", color: "#fff", paddingTop:'10px' }}
//                         >
//                             <img src="pvrd-light.png" alt="pvrd logo" width="120" height="80" />
//                         </MenuItem>
//                         <NavLink
//                             to={`product`}
//                             className={({ isActive, isPending }) =>
//                                 isActive
//                                     ? "active"
//                                     : isPending
//                                         ? "pending"
//                                         : ""
//                             }
//                             style={navlinkStyle}
//                         >
//                             <MenuItem icon={<HardwareIcon />}>Product Manager</MenuItem>
//                         </NavLink>
//                         <NavLink
//                             to={`category`}
//                             className={({ isActive, isPending }) =>
//                                 isActive
//                                     ? "active"
//                                     : isPending
//                                         ? "pending"
//                                         : ""
//                             }
//                             style={navlinkStyle}
//                         >
//                             <MenuItem icon={<CategoryIcon />}>Category Manager</MenuItem>
//                         </NavLink>
//                         <NavLink
//                             to={`subcategory`}
//                             className={({ isActive, isPending }) =>
//                                 isActive
//                                     ? "active"
//                                     : isPending
//                                         ? "pending"
//                                         : ""
//                             }
//                             style={navlinkStyle}
//                         >
//                             <MenuItem icon={<SegmentIcon />}>Subcategory Manager</MenuItem>
//                         </NavLink>
//                         <NavLink
//                             to={`productList`}
//                             className={({ isActive, isPending }) =>
//                                 isActive
//                                     ? "active"
//                                     : isPending
//                                         ? "pending"
//                                         : ""
//                             }
//                             style={navlinkStyle}
//                         >
//                             <MenuItem icon={<ListAltIcon />}>Product List</MenuItem>
//                         </NavLink>
//                         <NavLink
//                             to={`colour`}
//                             className={({ isActive, isPending }) =>
//                                 isActive
//                                     ? "active"
//                                     : isPending
//                                         ? "pending"
//                                         : ""
//                             }
//                             style={navlinkStyle}
//                         >
//                             <MenuItem icon={<PaletteIcon />}>Colour Manager</MenuItem>
//                         </NavLink>
//                         <NavLink
//                             to={`brand`}
//                             className={({ isActive, isPending }) =>
//                                 isActive
//                                     ? "active"
//                                     : isPending
//                                         ? "pending"
//                                         : ""
//                             }
//                             style={navlinkStyle}
//                         >
//                             <MenuItem icon={<ApprovalIcon />}>Brand Manager</MenuItem>
//                         </NavLink>
//                         <NavLink
//                             to={`size`}
//                             className={({ isActive, isPending }) =>
//                                 isActive
//                                     ? "active"
//                                     : isPending
//                                         ? "pending"
//                                         : ""
//                             }
//                             style={navlinkStyle}
//                         >
//                             <MenuItem icon={<FormatSizeIcon />}>Size Manager</MenuItem>
//                         </NavLink>
//                         <NavLink
//                             to={`uom`}
//                             className={({ isActive, isPending }) =>
//                                 isActive
//                                     ? "active"
//                                     : isPending
//                                         ? "pending"
//                                         : ""
//                             }
//                             style={navlinkStyle}
//                         >
//                             <MenuItem icon={<AdUnitsIcon />}>UoM Manager</MenuItem>
//                         </NavLink>
//                     </Menu>
//                 </Sidebar>
//                 <div style={{ width: '100%' }}>
//                     <main style={{ overflowY: 'scroll', height: '94vh' }}>
//                         <div id="detail">
//                             <Outlet />
//                         </div>
//                     </main>
//                     <div style={{ width: '100%', height: '6vh', textAlign: 'center', color: '#000', fontSize: '14px', fontWeight: '400', backgroundColor: '#ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                         <div style={{ padding: '10px' }}>
//                             Copyright &copy; 2023, PVRD Administration, Powered by FlyingDevs Technologies LLP
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Root;

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import MailIcon from '@mui/icons-material/Mail';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
 import PaletteIcon from '@mui/icons-material/Palette';
import ListAltIcon from '@mui/icons-material/ListAlt';
 import CategoryIcon from '@mui/icons-material/Category';
import HardwareIcon from '@mui/icons-material/Hardware';
 import SegmentIcon from '@mui/icons-material/Segment';
 import ApprovalIcon from '@mui/icons-material/Approval';
 import FormatSizeIcon from '@mui/icons-material/FormatSize';
 import AdUnitsIcon from '@mui/icons-material/AdUnits';
import { Outlet, Link, NavLink, useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Root() {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
    const theme = useTheme();
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    const navlinkStyle = ({ isActive, isPending, isTransitioning }) => {
        return {
            textDecoration: 'none',
            fontWeight: isPending ? "300" : isActive ? "700" : "300",
            color: isPending ? "#0e92ec" : isActive ? "#000" : "#fff",
            viewTransitionName: isTransitioning ? "slide" : "",
        };
    };
    const [isCatalogOpen, setIsCatalogOpen] = React.useState(true);

    const handleClick = () => {
        setIsCatalogOpen(!isCatalogOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* <AppBar position="fixed" open={isDrawerOpen}>
                <Toolbar style={{backgroundColor:'rgb(2, 81, 135)'}}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(isDrawerOpen && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar> */}
            <Drawer variant="permanent" open={isDrawerOpen}>
                <DrawerHeader style={{backgroundColor:'rgb(2, 81, 135)',justifyContent:'flex-start'}}>
                    {isDrawerOpen && (<div style={{color:'#fff',display:'flex',justifyContent:'center',alignItems:'center', width:'100%'}}>
                        <img src="pvrd-light.png" alt="pvrd logo" width="120" height="80" />
                    </div>)}
                
                    <IconButton onClick={isDrawerOpen ? handleDrawerClose : handleDrawerOpen}>
                        {isDrawerOpen ? <ChevronLeftIcon style={{color:'#fff'}} /> : 
                        <ChevronRightIcon style={{color:'#fff'}} />
                                            }
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'rgb(2, 81, 135)' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
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
                        <ListItemButton
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                        >
                            <ListItemIcon>
                                <HardwareIcon />
                            </ListItemIcon>
                            <ListItemText primary="Product Manager" />
                        </ListItemButton>
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
                        <ListItemButton
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                        >
                            <ListItemIcon>
                                <ListAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Product List" />
                        </ListItemButton>
                    </NavLink>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Catalog" />
                        {isCatalogOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={isCatalogOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
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
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <CategoryIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Category" />
                                </ListItemButton>
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
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <SegmentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="SubCategory" />
                                </ListItemButton>
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
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <ApprovalIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Brand" />
                                </ListItemButton>
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
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <FormatSizeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Size" />
                                </ListItemButton>
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
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <PaletteIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Colour" />
                                </ListItemButton>
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
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <AdUnitsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Unit of Measure" />
                                </ListItemButton>
                            </NavLink>
                        </List>
                    </Collapse>
                </List>

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Outlet />

            </Box>
        </Box>
    );
}