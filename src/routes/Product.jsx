import { useState, useEffect, useRef } from "react";
import { Form, useLoaderData, redirect } from "react-router-dom";
import axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Input from '@mui/material/Input';

const apiURL = process.env.REACT_APP_BASE_API_URL;

const Product = () => {
    const { categories } = useLoaderData();
    const [productImage, setProductImage] = useState('');
    const [productImageURL, setProductImageURL] = useState(null);
    const [productGalleryImages, setProductGalleryImages] = useState(null);
    const [productGalleryImagesURL, setProductGalleryImagesURL] = useState(null);
    const [productVariants, setProductVariants] = useState([]);
    const [productName, setProductName] = useState('');
    const [productBrandName, setProductBrandName] = useState('');
    const [productColour, setProductColour] = useState('');
    const [productSize, setProductSize] = useState('');
    const [productUoM, setProductUoM] = useState('');
    const [productPackingUnit, setProductPackingUnit] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productRewardPoint, setProductRewardPoint] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState('');

    const productImageRef = useRef(null);
    const productGalleryImageRef = useRef(null);

    useEffect(() => {
        if (selectedCategory !== '') {
            let tempOptions = categories.filter(category => category.value === selectedCategory)[0]?.subCategories.map(
                subCategory => {
                    return {
                        label: subCategory.name,
                        value: subCategory.id
                    }
                }
            );
            setSubCategoryOptions(tempOptions);
        }
    }, [selectedCategory]);

    const saveHandler = () => {
        let invalidProductVariants = productVariants.some((variant => { return variant.price == '' }))
        if (productName === '' || selectedCategory === '' || invalidProductVariants) {
            setError(true);
            setErrorMessage("Name, Category and Price of Product Variant(s) are mandatory")
            setTimeout(() => {
                setError(false);
                setErrorMessage('');
            }, 6000);
            return;
        }
        let data = new FormData();
        productImage !== '' && data.append("image", productImage);
        data.set("name", productName);
        productBrandName !== '' && data.set("brand", productBrandName);
        productColour !== '' && data.set("colour", productColour);
        productSize !== '' && data.set("size", productSize);
        productUoM !== '' && data.set("uom", productUoM);
        productPrice !== '' && data.set("price", productPrice);
        productPackingUnit !== '' && data.set("packingUnit", productPackingUnit);
        productRewardPoint !== '' && data.set("rewardPoint", productRewardPoint);
        productDescription !== '' && data.set("description", productDescription);
        data.set("category", selectedCategory);
        selectedSubCategory !== '' && data.set("subCategory", selectedSubCategory);
        data.set("productVariants", JSON.stringify(productVariants));
        setLoading(true);
        axios.post(`${apiURL}/api/v1/products/`, data).then(res => {
            console.log(res.data);
            if (res?.data?.id && productGalleryImages) {
                let galleryData = new FormData();
                for (let i = 0; i < productGalleryImages.length; i++) {
                    galleryData.append(`images`, productGalleryImages[i]);
                }

                axios.put(`${apiURL}/api/v1/products/gallery-images/${res.data.id}`, galleryData).then(
                    res => {
                        console.log(res.data, "Product created successfully with gallery images!");
                        setSuccess(true);
                        setSuccessMessage("Product created successfully with gallery images!");
                        setTimeout(() => {
                            setSuccess(false);
                            setSuccessMessage('');
                        }, 6000);
                        setLoading(false);
                    }
                ).catch(err => {
                    console.log("Error while adding gallary photos to the newly created product", err);
                    setError(true);
                    setErrorMessage("Error while adding gallary photos to the newly created product!")
                    setTimeout(() => {
                        setError(false);
                        setErrorMessage('');
                    }, 6000);
                    setLoading(false);
                })
            }
            else {
                setSuccess(true);
                setSuccessMessage("Product created successfully with no gallery image(s)");
                setTimeout(() => {
                    setSuccess(false);
                    setSuccessMessage('');
                }, 6000);
                setLoading(false);
            }

        }).catch(err => {
            console.log("Error while creating product: ", err);
            setError(true);
            setErrorMessage("Error while creating product!")
            setTimeout(() => {
                setError(false);
                setErrorMessage('');
            }, 6000);
            setLoading(false);
        })
        //return redirect(`/product`);
    }

    const handleAddVariant = (e) => {
        e.preventDefault();
        setProductVariants([...productVariants, { colour: '', size: '', uom: '', price: '', packingUnit: '', rewardPoint: '' }])
    }

    const handleVariantChange = (value, key, index) => {
        let tempProductVariants = [...productVariants];
        tempProductVariants[index][key] = value;
        setProductVariants(tempProductVariants);
    }

    const handleDeleteVariant = (index) => {
        let tempProductVariants = [...productVariants];
        tempProductVariants = tempProductVariants.filter((variant, i) => {
            return i != index;
        });
        setProductVariants(tempProductVariants);
    }

    const handleProductImage = (e) => {
        setProductImage(e.target.files[0]);
        setProductImageURL(URL.createObjectURL(e.target.files[0]))
    }
    
    const handleRemoveProductImage = () => {
        setProductImageURL(null);
        setProductImage('');
        productImageRef.current.value = "";
    }

    const handleProductGalleryImage = (e) => {
        setProductGalleryImages(e.target.files);
        let tempURLs = [];
        for(let i=0;i<e.target.files.length;i++){
            tempURLs.push(URL.createObjectURL(e.target.files[i]));
        }
        setProductGalleryImagesURL(tempURLs);
    }
    
    const handleRemoveProductGalleryImage = () => {
        setProductGalleryImagesURL(null);
        setProductGalleryImages('');
        productGalleryImageRef.current.value = "";
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
                        <span>Name</span>
                        <input
                            type="text"
                            name="productName"
                            placeholder="Product Name"
                            required={true}
                            onChange={e => setProductName(e.target.value)}
                            value={productName}
                        />
                    </label>
                    <div className="dataField">
                        <span style={{ marginRight: '5px' }}>Product Category: </span>
                        <FormControl>
                            <InputLabel id="category-select">Category</InputLabel>
                            <Select
                                style={{ width: '180px', height: '45px' }}
                                labelId="category-select"
                                id="select"
                                value={selectedCategory}
                                label="Category"
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories?.map((item, index) => (<MenuItem key={index} value={item.value}>{item.label}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
                    {subCategoryOptions.length > 0 && (
                        <div className="dataField">
                            <span style={{ marginRight: '5px' }}>Product SubCategory: </span>
                            <FormControl>
                                <InputLabel id="subCategory-select">SubCategory</InputLabel>
                                <Select
                                    style={{ width: '180px', height: '45px' }}
                                    labelId="subCategory-select"
                                    id="subCategory"
                                    value={selectedSubCategory}
                                    label="SubCategory"
                                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                                >
                                    {subCategoryOptions?.map((item, index) => (<MenuItem key={index} value={item.value}>{item.label}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </div>
                    )}
                    <label className="dataField">
                        <span>Brand Name</span>
                        <input
                            type="text"
                            name="productBrandName"
                            placeholder="Brand Name"
                            onChange={e => setProductBrandName(e.target.value)}
                            value={productBrandName}
                        />
                    </label>
                    <label className="dataField">
                        <span>Colour</span>
                        <input
                            type="text"
                            name="productColour"
                            placeholder="Product Colour"
                            onChange={e => setProductColour(e.target.value)}
                            value={productColour}
                        />
                    </label>
                    <label className="dataField">
                        <span>Size</span>
                        <input
                            type="text"
                            name="productSize"
                            placeholder="Product Size"
                            onChange={e => setProductSize(e.target.value)}
                            value={productSize}
                        />
                    </label>
                    <label className="dataField">
                        <span>Unit of Measure</span>
                        <input
                            type="text"
                            name="productUoM"
                            placeholder="Unit of Measure"
                            onChange={e => setProductUoM(e.target.value)}
                            value={productUoM}
                        />
                    </label>
                    <label className="dataField">
                        <span>MRP</span>
                        <input
                            type="number"
                            name="productPrice"
                            placeholder="Product MRP"
                            onChange={e => setProductPrice(e.target.value)}
                            value={productPrice}
                        />
                    </label>
                    <label className="dataField">
                        <span>Packing Unit</span>
                        <input
                            type="number"
                            name="productPackingUnit"
                            placeholder="Packing Unit"
                            onChange={e => setProductPackingUnit(e.target.value)}
                            value={productPackingUnit}
                        />
                    </label>
                    <label className="dataField">
                        <span>Reward Point</span>
                        <input
                            type="number"
                            name="productRewardPoint"
                            placeholder="Reward Point"
                            onChange={e => setProductRewardPoint(e.target.value)}
                            value={productRewardPoint}
                        />
                    </label>
                    <label>
                        <span>Description</span>
                        <textarea
                            name="productDescription"
                            placeholder="Product Description"
                            onChange={e => setProductDescription(e.target.value)}
                            value={productDescription}
                            rows={4}
                        />
                    </label>

                    <div style={{ marginTop: '20px' }}>
                        <span style={{ marginRight: '5px' }}>Product image: </span>
                        <input ref={productImageRef}  onChange={e => handleProductImage(e)} type='file' name='productImage' />
                    </div>
                    <div>
                        {productImageURL && (<img src={productImageURL} height={50} width={50} />)}
                        {productImageURL && (<button type="button" onClick={handleRemoveProductImage} disabled={loading}>Remove</button>)}
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <span style={{ marginRight: '5px' }}>Product Gallery Images: </span>
                        <input ref={productGalleryImageRef} onChange={e => handleProductGalleryImage(e)} type='file' name='productGallaryImage' multiple />
                    </div>
                    <div>
                        {productGalleryImagesURL && (productGalleryImagesURL.map(image => {return (<img src={image} height={50} width={50} />)}))}
                        {productGalleryImagesURL && (<button type="button" onClick={handleRemoveProductGalleryImage} disabled={loading}>Remove</button>)}
                    </div>
                    <div>
                        <span>Product variants: </span>
                        <button
                            type="button"
                            disabled={loading}
                            onClick={(e) => handleAddVariant(e)}
                        >Add variant</button>

                        {productVariants?.map((variant, index) => {

                            return (<div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px' }}>
                                <input type='text' name='colour' placeholder='Colour' value={productVariants[index].colour} onChange={(e) => { handleVariantChange(e.target.value, 'colour', index) }} />
                                <input type='text' name='size' placeholder='Size' value={productVariants[index].size} onChange={(e) => { handleVariantChange(e.target.value, 'size', index) }} />
                                <input type='text' name='uom' placeholder='Unit of Measurement' value={productVariants[index].uom} onChange={(e) => { handleVariantChange(e.target.value, 'uom', index) }} />
                                <input required={true} type='number' name='price' placeholder='Price' value={productVariants[index].price} onChange={(e) => { handleVariantChange(e.target.value, 'price', index) }} />
                                <input type='number' name='packingUnit' placeholder='Packing Unit' value={productVariants[index].packingUnit} onChange={(e) => { handleVariantChange(e.target.value, 'packingUnit', index) }} />
                                <input type='number' name='rewardPoint' placeholder='Reward Point' value={productVariants[index].rewardPoint} onChange={(e) => { handleVariantChange(e.target.value, 'rewardPoint', index) }} />
                                <DeleteRoundedIcon style={{ cursor: 'pointer' }} onClick={(e) => { handleDeleteVariant(index) }} />
                            </div>)
                        })}
                    </div>
                        <button className="saveButton" type="button" onClick={saveHandler} disabled={loading}>Save</button>
                    
                </form>
            </div>
        </>

    );
}

export const loader = async ({ params }) => {

    try {
        const response = await axios.get(`${apiURL}/api/v1/categories/`);
        let data = response.data.map(category => {
            return {
                label: category.name,
                value: category.id,
                subCategories: category.subCategories
            }
        });
        return { categories: data };
    } catch (error) {
        console.log("error while fetching categories", error);
        return { categories: [] };
    }
}

export default Product;