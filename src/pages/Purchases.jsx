import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {
    const dispatch = useDispatch()
    const purchases = useSelector(state=>state.purchases)
    useEffect(()=>{
        dispatch(getPurchasesThunk())
    },[])
    console.log(purchases);
    return (
        <div>
            <h1>Purchases</h1>
            <ul>
                {
                    purchases.map(purchase=>(
                        <div key={purchase.id}>
                            <h2>{purchase.createdAt}</h2>
                            <div>
                                {purchase.cart.products.map(product=>(
                                    <div key={product.id}>{product.title}</div>
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