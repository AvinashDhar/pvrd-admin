import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import './index.css';
//import App from './App-not-in-use';
import reportWebVitals from './reportWebVitals';
import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import Category, {loader as categoryLoader, action as createCategory} from './routes/Category';
import {productInputLoader} from './routes/Product';
import { productLoader } from './routes/ProductList';
import SubCategory from './routes/SubCategory';
import Product from './routes/Product';
import Login from './routes/Login';
import ProductList from './routes/ProductList';
import Colour from './routes/Colour';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index:true,
        element: <Product />,
        loader: categoryLoader,
      },
      {
        path: "category",
        element: <Category />,
        //loader: categoryLoader,
        // action: createCategory
      },
      {
        path: "subcategory",
        element: <SubCategory />,
        loader: categoryLoader,
        // action: createCategory
      },
      {
        path: "colour",
        element: <Colour />,
        //loader: categoryLoader,
        // action: createCategory
      },
      {
        path: "product",
        element: <Product />,
        loader: productInputLoader,
        // action: createCategory
      },
      {
        path: "productList/:productId",
        element: <Product />,
        loader: productInputLoader,
        // action: createCategory
      },
      {
        path: "productList",
        element: <ProductList />,
        loader: productLoader,
        // action: createCategory
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <ProSidebarProvider>
    <RouterProvider router={router} />
    </ProSidebarProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
