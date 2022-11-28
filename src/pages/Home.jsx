import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductsThunk, filterProductsThunk, filterQueryThunk } from '../store/slices/products.slice';

const Home = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    const [categories, setCategories] = useState([])
    const [inputSearch, setInputSearch] = useState('')


    useEffect(() => {
        dispatch(getProductsThunk())

        axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))
    }, [])



    return (
        <div>
            <div>
                <h2>Categories</h2>
                {categories.map(category => (
                    <button key={category.id}
                        onClick={() => dispatch(filterProductsThunk(category.id))}
                    >{category.name}</button>
                ))}
            </div>
            <div>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={inputSearch}
                        onChange={e => setInputSearch(e.target.value)}
                    />
                    <Button variant="outline-secondary" id="button-addon2"
                        onClick={() => { dispatch(filterQueryThunk(inputSearch)) }}
                    >
                        Button
                    </Button>
                </InputGroup>
            </div>
            <div className='all-products'>
                {products.map(product => (
                    <div className='product-card' key={product.id}>
                        <Link className='img-title' to={`/product/${product.id}`}>

                            <img className='product-image' src={product.productImgs[0]} alt="" />

                            <p className='product-title'> <b> {product.title} </b> </p>
                        </Link>
                        <div className='price-and-btn'>
                            <span>Price</span>
                            <p className='price'>${product.price}</p>
                            <button className='btn-addCart'><i class='bx bx-cart' ></i></button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Home;