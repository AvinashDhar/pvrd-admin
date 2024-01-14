import React from 'react'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';

export const ProductItem = ({productData}) => {
    const handleEdit = (e) => {
        console.log("inside handle edit")
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px',borderRadius:'10px',border:'1px solid #ccc' }}>
            <div style={{padding:'10px'}}>
                <div>{productData.name}</div>
                <div>{productData.brand}</div>
                <div>{productData.category.name}</div>
                <div>{productData.subCategory?.name}</div>
                <img src={productData.image} height={50} width={50} />
                <div>
                <span>Gallery Images</span>
                {productData.images?.map(image => {
                    return (<div>
                        <img src={image} width={50} height={50} />
                    </div>)
                })}
                </div> 
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-evenly',backgroundColor:'#025187',color:'#fff',padding:'0 10px',borderTopRightRadius: '9px',borderBottomRightRadius:'9px'}}>
                <div>
                    <EditIcon style={{ cursor: 'pointer' }} onClick={(e) => { handleEdit(e) }} />
                </div>
                <div>
                    <DeleteRoundedIcon style={{ cursor: 'pointer' }} onClick={(e) => { handleEdit(e) }} />  
                </div>
                
            </div>
        </div>
    )
}
