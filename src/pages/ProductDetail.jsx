import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductDetail = () => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const [indexImage, setIndexImage] = useState(0)


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
            <div className='main-information'>
                <div className='grid image'>
                    <div className='main-image-container'>
                        <button className='change-image' onClick={() => {
                            if (indexImage > 0) {
                                setIndexImage(indexImage - 1)
                            }
                        }}> {'<'} </button>
                        <img className='main-image' src={product?.productImgs[indexImage]} alt="" />
                        <button className='change-image' onClick={() => {
                            if (indexImage < product.productImgs.length - 1) {
                                setIndexImage(indexImage + 1)
                            }
                        }}>{'>'}</button>
                    </div>
                    <div className='litle-images'>
                        {
                            product?.productImgs.map(image => (
                                <div key={product.productImgs.indexOf(image)}>
                                    <img
                                        src={image}
                                        className='product-images'
                                        onClick={() => setIndexImage(product?.productImgs.indexOf(image))}
                                    />
                                </div>

                            ))
                        }
                    </div>
                </div>
                <h3 className='grid title product-title'>{product?.title}</h3>
                <p className='grid description'>{product?.description}</p>
                <div className='grid price'>
                    <span>Price</span>
                    <p>${product?.price}</p>
                </div>
                <div className='grid quantity'>
                    <span>Quantity</span>
                    <div className='quantity-container'>
                        <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>
                </div>
                <button 
                    className='grid btn-cart'
                    onClick={()=>{
                        const products={
                            id:product.id,
                            quantity:quantity
                        }
                        console.log(products);
                    }}
                >add to cart<i className='bx bx-cart'></i></button>
            </div>

            <h2>Related Products</h2>
            <div className='related-items'>

                {productsRelated.map(product => (
                    <Link className='product-card' to={`/product/${product.id}`}key={product.id}>
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
                                <button className='add-to-cart-card'><i className='bx bx-cart'></i></button>
                            </div>
                        </div>
                    </Link>
                ))

                }
            </div>

        </div>
    );
};

export default ProductDetail;