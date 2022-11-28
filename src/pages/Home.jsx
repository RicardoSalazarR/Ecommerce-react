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
    const[priceFrom, setPriceFrom] = useState('') 
    const[priceTo, setPriceTo] = useState('')

    useEffect(() => {
        dispatch(getProductsThunk())

        axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))
    }, [])



    return (
        <div className='home-container' >
            <div className='filters-container'>
                <div>
                    <h2>Price</h2>
                    <Form>
                        <fieldset enable>
                            <Form.Group className="mb-3" onChange={e=> setPriceFrom(e.target.value)} >
                                <Form.Label htmlFor="disabledTextInput">From</Form.Label>
                                <Form.Control id="disabledTextInput"/>
                            </Form.Group>
                            <Form.Group className="mb-3" onChange={e => setPriceTo(e.target.value)}>
                                <Form.Label htmlFor="disabledSelect">To</Form.Label>
                                <Form.Control id="disabledSelect"/>
                            </Form.Group>
                            <Button type="submit" onClick={()=>alert(priceFrom+' '+priceTo)} >Submit</Button>
                        </fieldset>
                    </Form>
                </div>
                <hr />
                <div className='categories' >
                    <h2>Category</h2>
                    {categories.map(category => (
                        <p key={category.id}
                            onClick={() => dispatch(filterProductsThunk(category.id))}
                        >{category.name}</p>
                    ))}
                </div>
            </div>

            <div className='products'>
                <div className='input-search'>
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
                <div className='products-container'>
                    {products.map(product => (
                        <li key={product.id}>
                            <Link className='product-card' to={`/product/${product.id}`}>
                                <div>
                                    <div>
                                        <img className='product-image' src={product.productImgs[0]} alt="" />
                                    </div>
                                    <div className='card-description'>
                                        <span className='title'> <b> {product.title} </b> </span>
                                        <div className='price'>
                                            <span>Price </span>
                                            <span> ${product.price}</span>
                                        </div>
                                        <button className='add-to-cart-card'><i class='bx bx-cart'></i></button>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Home;