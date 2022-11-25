import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from '../store/slices/products.slice';

const Home = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getProductsThunk())
    },[])
const products = useSelector(state=> state.products)


    return (
        <div>
            <h1>Home</h1>
        </div>
    );
};

export default Home;