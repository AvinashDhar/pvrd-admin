import React from 'react'
import axios from "axios";
import { useLoaderData } from 'react-router-dom';

import { ProductItem } from '../components/ProductItem';

const apiURL = process.env.REACT_APP_BASE_API_URL;
function ProductList() {
    const {productList} = useLoaderData();
  return (
    <>
        {productList?.map(product => {
            return <ProductItem  productData={product} />
        })}
    </>
  )
}

export default ProductList;

export const productLoader = async ({ params }) => {

    try {
        const response = await axios.get(`${apiURL}/api/v1/products/`);
        return { productList: response.data };
    } catch (error) {
        console.log("error while fetching products", error);
        return { productList: [] };
    }
}