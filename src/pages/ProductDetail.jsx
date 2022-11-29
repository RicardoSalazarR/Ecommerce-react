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
            <div className='main-information'>
                <div className='grid image'>
                    <div>
                        <button className='change-image'> {'<'} </button>
                        <img src={product?.productImgs[0]} alt="" />
                        <button className='change-image'>{'>'}</button>
                    </div>
                    <div>
                        {
                            product.productImgs.map(image=>(
                                <img src={image} alt="" key={image} className='product-images'/>
                            ))
                        }
                    </div>
                </div>
                <p className='grid title'>{product?.title}</p>
                <h1 className='grid detail'>Product Detail</h1>
                <p className='grid description'>{product?.description}</p>
                <div className='grid price'>
                    <span>Price</span>
                    <p>{product?.price}</p>
                </div>
                <div className='grid quantity'>
                    <span>Quantity</span>
                    <div>
                        <button onClick={() => quantity > 0 && setQuantity(quantity - 1)}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>
                </div>
                <button className='grid btn-cart'>add to cart</button>
            </div>

            <h2>Related Products</h2>
            <div className='related-items'>
                
                {productsRelated.map(product => (
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
                ))

                }
            </div>

        </div>
    );
};

export default ProductDetail;


// <div className='product-detail'>
//             <h1>Product Detail</h1>
//             <div className='product-despription'>
//                 <img src={product?.productImgs[0]} alt="" />
//                 <div>
//                     <h3>{product?.title}</h3>
//                     <p>{product?.description}</p>
//                     <div className='price-and-quantity'>
//                         <div>
//                             <span>Price</span>
//                             <p>{product?.price}</p>
//                         </div>
//                         <div>
//                             <span>Quantity</span>
//                             <button onClick={() => quantity > 0 && setQuantity(quantity - 1)}>-</button>
//                             <span>{quantity}</span>
//                             <button onClick={() => setQuantity(quantity + 1)}>+</button>
//                         </div>
//                     </div>
//                     <button className='btn-cart'>add to cart</button>
//                 </div>
//             </div>