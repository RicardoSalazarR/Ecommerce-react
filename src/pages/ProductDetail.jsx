import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductDetail = () => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)


    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    const { id } = useParams()
    const productsList = useSelector(state => state.products)

    const product = productsList.find(productsItem => productsItem.id === Number(id))
    const productsRelated = productsList.filter(productsItem =>
        productsItem.category.id === product.category.id)

    return (
        <div className='product-detail'>
            <h1>Product Detail</h1>
            <img src={product?.productImgs[0]} alt="" />
            <p>{product?.title}</p>
            <span>Price</span>
            <p>{product?.description}</p>
            <p>{product?.price}</p>
            <div>
                <span>Quantity</span>
                <button onClick={() => quantity > 0 && setQuantity(quantity - 1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className='btn-cart'>add to cart</button>

            <div>
                <h2>Related Products</h2>
                {productsRelated.map(product => (
                    <Link to={`/product/${product.id}`} key={product.id}>
                        <p>{product.title}</p>
                    </Link>
                ))

                }
            </div>

        </div>
    );
};

export default ProductDetail;