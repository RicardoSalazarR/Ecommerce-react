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

    const date=(purchaseDate)=>{
        const timeStamp = new Date(purchaseDate).getTime()
    
        const day = new Date(timeStamp).getDate()
        const month = new Date(timeStamp).toLocaleString('default', {month:'long'})
        const year = new Date(timeStamp).getFullYear()

        return (month +' '+day+' '+year)
    }

    return (
        <div>
            <h1>Purchases</h1>
            <ul className='purchases'>
                {
                    purchases.map(purchase => (
                        <div className='purchases-card' key={purchase.id}>
                            <h2 className='purchase-created'>{date(purchase.createdAt)}</h2>
                            <div>
                                {/* {purchase.product.map(product => ( */}
                                    <div className="product-info">
                                        <div className='purchases-title'>{purchase.product.title}</div>
                                        <div className='purchases-quantity'>{purchase.quantity}</div>
                                        <span className='product-price'>$ {purchase.product.price}</span>
                                    </div>
                                {/*})) } */}
                            </div>
                        </div>
                    ))
                }
            </ul>
        </div>
    );
};

export default Purchases;