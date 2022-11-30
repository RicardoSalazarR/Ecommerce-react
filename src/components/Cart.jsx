import React, { useState } from 'react';
import { useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk } from '../store/slices/cart.slice';

const Cart = ({show,handleClose}) => {

    const dispatch = useDispatch()
    const cartProducts = useSelector(state=>state.cart)
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        dispatch(getCartThunk());
    },[])

    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className='cart-products-container'>
                    {
                        cartProducts.map(product=>(
                            <div key={product.id} className='cart-product'>
                                <span className='cart-brand-product'>{product.brand}</span>
                                <span className='cart-title-product' >{product.title}</span>
                                <div className='cart-quantity-product'>
                                    <button>-</button>
                                    <span>{product.quantity}</span>
                                    <button>+</button>
                                </div>
                                <span className='cart-total-text'>total</span>
                                <span className='cart-total-product'>${product.price*product.quantity}</span>
                                <button className='cart-delete-product'><i class='bx bx-trash'></i></button>
                            </div>
                        ))
                    }
                </div>
                <div className='cart-total'>
                    <p>Total</p>
                    <p>{total}</p>
                </div>
                <button className='checkout'>Checkout</button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;