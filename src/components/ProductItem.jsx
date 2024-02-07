import React from 'react'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { redirect, Link} from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

export const ProductItem = ({ productData }) => {
    const handleEdit = (e) => {
        console.log("inside handle edit");
        redirect(`/product/${productData?.id}`);
    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        
        setOpen(true)};
    const handleClose = () => {
          setOpen(false);
      }
    
    return (
        <>
        {/* <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                
                <Box sx={style}>
                <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                        <CloseIcon style={{ cursor: 'pointer' }} onClick={() => handleClose()} />
                </div>
                <div>{productData.name}</div>
                    <div>{productData.brand}</div>
                    <div>{productData.category.name}</div>
                    <div>{productData.subCategory?.name}</div>
                    <img src={productData.image} height={50} width={50} />
                </Box>
                </>
            </Modal> */}
            <div style={{ display: 'flex', 
            justifyContent: 'space-between', 
            margin: '10px', 
            borderRadius: '10px', 
            border: '1px solid #ccc',
            maxWidth:'750px' }}>
                <div style={{ padding: '10px' }}>
                <img src={productData.image} height={100} width={100} />
                    <div>
                        <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
                        {productData.images?.map(image => {
                            return (<div>
                                <img src={image} width={50} height={50} />
                            </div>)
                        })}
                        </div>
                    </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                <div>Name: {productData.name}</div>
                    <div>Brand: {productData.brand.name}</div>
                    <div>Category: {productData.category.name}</div>
                    <div>Subcategory: {productData.subCategory?.name}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: '#025187', color: '#fff', padding: '0 10px', borderTopRightRadius: '9px', borderBottomRightRadius: '9px' }}>
                    <div>
                    <Link to={`${productData?.id}`} state={{ productData }} >
                        <EditIcon style={{ cursor: 'pointer', color:'#fff' }} />
                    </Link>
                        
                    </div>
                    <div>
                        <DeleteRoundedIcon style={{ cursor: 'pointer', color:'#be3131' }} onClick={(e) => { handleEdit(e) }} />
                    </div>

                </div>
            </div>
        </>
    )
}
