import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {
    const dispatch = useDispatch()
    const purchases = useSelector(state => state.purchases)
    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])
    return (
        <div>
            <h1>Purchases</h1>
            <ul className='purchases'>
                {
                    purchases.map(purchase => (
                        <div className='purchases-card' key={purchase.id}>
                            <h2 className='purchase-created'>{purchase.createdAt}</h2>
                            <div>
                                {purchase.cart.products.map(product => (
                                    <div className="product-info">
                                        <div className='purchases-title' key={product.id}>{product.title}</div>
                                        <span className='product-price'>$ {product.price}</span>
                                    </div>
                                ))

                                }
                            </div>
                        </div>
                    ))
                }
            </ul>
        </div>
    );
};

export default Purchases;