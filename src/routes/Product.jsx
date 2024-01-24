import { useState, useEffect, useRef, useMemo } from "react";
import { Form, useLoaderData, useLocation } from "react-router-dom";
import axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const apiURL = process.env.REACT_APP_BASE_API_URL;

const Product = () => {
    let isEditMode = false;
    let productData = null;
    const location = useLocation();
    if (location.state?.productData) {
        isEditMode = true;
        productData = location.state.productData;
    }
    const { categories, colours } = useLoaderData();
    const [productImage, setProductImage] = useState('');
    const [productImageURL, setProductImageURL] = useState(isEditMode ? productData?.image : null);
    const [productGalleryImages, setProductGalleryImages] = useState(null);
    const [productGalleryImagesURL, setProductGalleryImagesURL] = useState(isEditMode ? productData?.images : null);
    const [productVariants, setProductVariants] = useState(isEditMode ? productData?.productVariants : []);
    const [productName, setProductName] = useState(isEditMode ? productData?.name : '');
    const [productBrandName, setProductBrandName] = useState(isEditMode ? productData?.brand : '');
    const [productColour, setProductColour] = useState('');
    const [productSize, setProductSize] = useState(isEditMode ? productData?.size : '');
    const [productUoM, setProductUoM] = useState(isEditMode ? productData?.uom : '');
    const [productPrice, setProductPrice] = useState(isEditMode ? productData?.price : '');
    const [productRewardPoint, setProductRewardPoint] = useState(isEditMode ? productData?.rewardPoint : '');
    const [productDescription, setProductDescription] = useState(isEditMode ? productData?.description : '');
    const [selectedCategory, setSelectedCategory] = useState(isEditMode ? productData?.category.id : '');
    const [selectedColour, setSelectedColour] = useState(isEditMode ? productData?.colour?.id : '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(isEditMode ? productData?.subCategory?.id : '');
    const productImageRef = useRef(null);
    const productGalleryImageRef = useRef(null);
    console.log("productGalleryImagesURL ",productGalleryImagesURL)
    useEffect(()=>{
        console.log("productimage: ",productImage)
    },[productImage])

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

    const getColourImageURL = (colourId) => {
        let tempColourObj = colours.filter(colour => { return colour.value === colourId });
        return tempColourObj[0]?.image;
    }

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
        
        if(isEditMode){
            let data = new FormData();
            productImage !== '' && data.append("image", productImage);
            data.set("name", productName);
            productBrandName !== '' && data.set("brand", productBrandName);
            selectedColour !== '' && data.set("colour", selectedColour);
            productSize !== '' && data.set("size", productSize);
            productUoM !== '' && data.set("uom", productUoM);
            productPrice !== '' && data.set("price", productPrice);
            productRewardPoint !== '' && data.set("rewardPoint", productRewardPoint);
            productDescription !== '' && data.set("description", productDescription);
            data.set("category", selectedCategory);
            selectedSubCategory !== '' && data.set("subCategory", selectedSubCategory);
            data.set("productVariants", JSON.stringify(productVariants));
            setLoading(true);
            axios.put(`${apiURL}/api/v1/products/${productData.id}`, data).then(res => {
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
    
                        //in this case delete the product created above
                        axios.delete(`${apiURL}/api/v1/products/${res.data.id}`).then(res => {
                            console.log("deleting the created product: ", res.data);
                            setError(true);
                            setErrorMessage("Error while adding gallary photos! Please try again after changing them");
                            setTimeout(() => {
                                setError(false);
                                setErrorMessage('');
                            }, 6000);
                            setLoading(false);
                        }).catch(err => {
                            console.log("something went wrong please contact support")
                            setError(true);
                            setErrorMessage(`Something went wrong! Please contact support by shaing this id: ${res.data.id}`)
                            setTimeout(() => {
                                setError(false);
                                setErrorMessage('');
                            }, 12000);
                            setLoading(false);
    
                        })
                    })
                }
                else {
                    setSuccess(true);
                    setSuccessMessage("Product updated successfully with no gallery image(s)");
                    setTimeout(() => {
                        setSuccess(false);
                        setSuccessMessage('');
                    }, 6000);
                    setLoading(false);
                }
    
            }).catch(err => {
                console.log("Error while updating product: ", err.response.data.error);
                err.response.data.error === "Product Name or Brand Name is not unique!" ?
                    setErrorMessage("Product Name or Brand Name is not unique!") :
                    setErrorMessage("Error while updating product!")
                setError(true);
                setTimeout(() => {
                    setError(false);
                    setErrorMessage('');
                }, 6000);
                setLoading(false);
            })
        } else {
            let data = new FormData();
            productImage !== '' && data.append("image", productImage);
            data.set("name", productName);
            productBrandName !== '' && data.set("brand", productBrandName);
            selectedColour !== '' && data.set("colour", selectedColour);
            productSize !== '' && data.set("size", productSize);
            productUoM !== '' && data.set("uom", productUoM);
            productPrice !== '' && data.set("price", productPrice);
            productRewardPoint !== '' && data.set("rewardPoint", productRewardPoint);
            productDescription !== '' && data.set("description", productDescription);
            data.set("category", selectedCategory);
            selectedSubCategory !== '' && data.set("subCategory", selectedSubCategory);
            data.set("productVariants", JSON.stringify(productVariants));
            setLoading(true);
            axios.post(`${apiURL}/api/v1/products/`, data).then(res => {
                if (res?.data?.id && productGalleryImages) {
                    let galleryData = new FormData();
                    for (let i = 0; i < productGalleryImages.length; i++) {
                        galleryData.append(`images`, productGalleryImages[i]);
                    }
    
                    axios.put(`${apiURL}/api/v1/products/gallery-images/${res.data.id}`, galleryData).then(
                        res => {
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
    
                        //in this case delete the product created above
                        axios.delete(`${apiURL}/api/v1/products/${res.data.id}`).then(res => {
                            setError(true);
                            setErrorMessage("Error while adding gallary photos! Please try again after changing them");
                            setTimeout(() => {
                                setError(false);
                                setErrorMessage('');
                            }, 6000);
                            setLoading(false);
                        }).catch(err => {
                            console.log("something went wrong please contact support")
                            setError(true);
                            setErrorMessage(`Something went wrong! Please contact support by shaing this id: ${res.data.id}`)
                            setTimeout(() => {
                                setError(false);
                                setErrorMessage('');
                            }, 12000);
                            setLoading(false);
    
                        })
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
                console.log("Error while creating product: ", err.response.data.error);
                err.response.data.error === "Product Name or Brand Name is not unique!" ?
                    setErrorMessage("Product Name or Brand Name is not unique!") :
                    setErrorMessage("Error while creating product!")
                setError(true);
                setTimeout(() => {
                    setError(false);
                    setErrorMessage('');
                }, 6000);
                setLoading(false);
            })
        }
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
        if(isEditMode) {
            let data = new FormData();
            data.set("removeImage", true);
            setLoading(true);
            setProductImageURL(null);
            setProductImage('');
            productImageRef.current.value = "";
            axios.put(`${apiURL}/api/v1/products/${productData.id}`, data).then(res => {
                setSuccess(true);
                setSuccessMessage("Product image removed successfully!");
                setTimeout(() => {
                    setSuccess(false);
                    setSuccessMessage('');
                }, 6000);
                setLoading(false);
            }).catch(err => {
                console.log("something went wrong please contact support")
                setError(true);
                setErrorMessage(`Something went wrong!`)
                setTimeout(() => {
                    setError(false);
                    setErrorMessage('');
                }, 6000);
                setLoading(false);

            })
        }
        else {
            setProductImageURL(null);
            setProductImage('');
            productImageRef.current.value = "";
        }
    }

    const handleProductGalleryImage = (e) => {
        setProductGalleryImages(e.target.files);
        let tempURLs = [];
        for (let i = 0; i < e.target.files.length; i++) {
            tempURLs.push(URL.createObjectURL(e.target.files[i]));
        }
        setProductGalleryImagesURL(tempURLs);
    }

    const handleRemoveProductGalleryImage = () => {
        if(isEditMode) {
            let data = new FormData();
            data.set("removeImages", true);
            setLoading(true);
            setProductGalleryImagesURL(null);
            setProductGalleryImages('');
            productGalleryImageRef.current.value = "";
            axios.put(`${apiURL}/api/v1/products/${productData.id}`, data).then(res => {
                setSuccess(true);
                setSuccessMessage("Product gallery images removed successfully!");
                setTimeout(() => {
                    setSuccess(false);
                    setSuccessMessage('');
                }, 6000);
                setLoading(false);
            }).catch(err => {
                console.log("something went wrong please contact support")
                setError(true);
                setErrorMessage(`Something went wrong!`)
                setTimeout(() => {
                    setError(false);
                    setErrorMessage('');
                }, 6000);
                setLoading(false);

            })
        }
        else {
            setProductGalleryImagesURL(null);
            setProductGalleryImages('');
            productGalleryImageRef.current.value = "";
        }
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
                    <div className="dataField">
                        <span style={{ marginRight: '5px' }}>Product Colour: </span>
                        <FormControl>
                            <InputLabel id="colour-select">Colour</InputLabel>
                            <Select
                                style={{ width: '180px', height: '45px' }}
                                labelId="colour-select"
                                id="colour"
                                value={selectedColour}
                                label="Colour"
                                onChange={(e) => setSelectedColour(e.target.value)}
                            >
                                {colours?.map((item, index) => (<MenuItem key={index} value={item.value}>{item.label}</MenuItem>))}
                            </Select>
                        </FormControl>
                        {selectedColour && (<img style={{ marginLeft: '10px' }} src={getColourImageURL(selectedColour)} height={50} width={50} />)}
                    </div>
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
                    </label>
                    <div>
                        <ReactQuill theme="snow" value={productDescription} onChange={setProductDescription} />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <span style={{ marginRight: '5px' }}>Product image: </span>
                        <input ref={productImageRef} onChange={e => handleProductImage(e)} type='file' name='productImage' />
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
                        {productGalleryImagesURL && (productGalleryImagesURL.map(image => { return (<img src={image} height={50} width={50} />) }))}
                        {productGalleryImagesURL?.length > 0 && (<button type="button" onClick={handleRemoveProductGalleryImage} disabled={loading}>Remove</button>)}
                    </div>
                    <div>
                        <span>Product variants: </span>
                        <button
                            type="button"
                            disabled={loading}
                            onClick={(e) => handleAddVariant(e)}
                        >Add variant</button>

                        {productVariants?.map((variant, index) => {

                            return (<div key={index} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px', borderRadius: '10px', border: '1px solid #ccc' }}>
                                {/* <input type='text' name='colour' placeholder='Colour' value={productVariants[index].colour} onChange={(e) => { handleVariantChange(e.target.value, 'colour', index) }} /> */}

                                <div style={{ padding: '10px' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FormControl>
                                                <InputLabel id="variant-colour">Colour</InputLabel>
                                                <Select
                                                    style={{ width: '180px', height: '45px' }}
                                                    labelId="variant-colour"
                                                    id="variant-colour-select"
                                                    value={productVariants[index].colour}
                                                    label="variant-colour"
                                                    onChange={(e) => handleVariantChange(e.target.value, 'colour', index)}
                                                >
                                                    {colours?.map((item, index) => (<MenuItem key={index} value={item.value}>{item.label}</MenuItem>))}
                                                </Select>
                                            </FormControl>
                                            {productVariants[index]?.colour && (<img style={{ marginLeft: '10px' }} src={getColourImageURL(productVariants[index].colour)} height={50} width={50} />)}
                                        </div>
                                        <input type='text' name='size' placeholder='Size' value={productVariants[index].size} onChange={(e) => { handleVariantChange(e.target.value, 'size', index) }} />
                                        <input type='text' name='uom' placeholder='Unit of Measurement' value={productVariants[index].uom} onChange={(e) => { handleVariantChange(e.target.value, 'uom', index) }} />
                                    </div>
                                    <div>
                                        <input required={true} type='number' name='price' placeholder='Price' value={productVariants[index].price} onChange={(e) => { handleVariantChange(e.target.value, 'price', index) }} />
                                        <input type='number' name='packingUnit' placeholder='Packing Unit' value={productVariants[index].packingUnit} onChange={(e) => { handleVariantChange(e.target.value, 'packingUnit', index) }} />
                                        <input type='number' name='rewardPoint' placeholder='Reward Point' value={productVariants[index].rewardPoint} onChange={(e) => { handleVariantChange(e.target.value, 'rewardPoint', index) }} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#025187', color: '#fff', padding: '0 10px', borderTopRightRadius: '9px', borderBottomRightRadius: '9px' }}>
                                    <DeleteRoundedIcon style={{ cursor: 'pointer', color:'#be3131' }} onClick={(e) => { handleDeleteVariant(index) }} />
                                </div>
                            </div>)
                        })}
                    </div>
                    <button className="saveButton" type="button" onClick={saveHandler} disabled={loading}>Save</button>

                </form>
            </div>
        </>

    );
}

export const productInputLoader = async ({ params }) => {

    try {
        const categoriesResponse = await axios.get(`${apiURL}/api/v1/categories/`);
        let categories = categoriesResponse.data.map(category => {
            return {
                label: category.name,
                value: category.id,
                subCategories: category.subCategories
            }
        });
        const coloursResponse = await axios.get(`${apiURL}/api/v1/colours/`);
        let colours = coloursResponse.data.map(colour => {
            return {
                label: colour.name,
                value: colour.id,
                image: colour.image
            }
        });
        return { categories, colours };
    } catch (error) {
        console.log("error while fetching categories", error);
        return { categories: [], colours: [] };
    }
}

export default Product;