import React, { useState } from 'react';
import { useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk, checkoutCartThunk,deleteCartThunk } from '../store/slices/cart.slice';

const Cart = ({ show, handleClose }) => {
    const dispatch = useDispatch()
    const cartProducts = useSelector(state => state.cart)
    const total = useSelector(state => state.totalCart)

    useEffect(() => {
        dispatch(getCartThunk());
    }, [])

    const deleteProduct = (product)=>{
        dispatch(deleteCartThunk(product.id));
    }
    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className='cart-products-container'>
                    {
                        cartProducts.map(product => (
                            <div key={product.id} className='cart-product'>
                                <img src={product.product.images[0].url} alt="imagen" />
                                <span className='cart-brand-product'>{product.product.brand}</span>
                                <span className='cart-title-product' >{product.product.title}</span>
                                <span className='cart-quantity-product'>quantity: {product.quantity}</span>
                                <span className='cart-total-text'>Total</span>
                                <span className='cart-total-product'>${product.product.price * product.quantity}</span>
                                <button className='cart-delete-product' onClick={()=>deleteProduct(product)}><i className='bx bx-trash'></i></button>
                            </div>
                        ))
                    }
                </div>
                <div className='cart-total'>
                    <p>Total</p>
                    <p>$ {total}</p>
                </div>
                <button
                    className='checkout'
                    onClick={() => {
                        dispatch(checkoutCartThunk())
                        setTotal(0)
                    }}
                >Checkout</button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;