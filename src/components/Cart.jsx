import React, { useState } from 'react';
import { useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk, checkoutCartThunk } from '../store/slices/cart.slice';

const Cart = ({ show, handleClose }) => {

    const dispatch = useDispatch()
    const cartProducts = useSelector(state => state.cart)
    // const [total, setTotal] = useState(0)

    useEffect(() => {
        dispatch(getCartThunk());
    }, [])

    let total = 0;
    if (cartProducts.length) {
        if (cartProducts?.length > 1) {
            total = cartProducts?.reduce((initial, current) => {
                if (typeof initial === 'number') {
                    return initial + (current.price * current.productsInCart?.quantity)
                } else {
                    return (initial.price * initial.productsInCart?.quantity) + (current.price * current.productsInCart?.quantity)
                }
            });
        } else {
            total = cartProducts?.[0].price * cartProducts?.[0].productsInCart?.quantity
        }
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
                                <span className='cart-brand-product'>{product.brand}</span>
                                <span className='cart-title-product' >{product.title}</span>
                                <span className='cart-quantity-product'>{product.productsInCart.quantity}</span>
                                <span className='cart-total-text'>Total</span>
                                <span className='cart-total-product'>${product.price * product.productsInCart.quantity}</span>
                                <button className='cart-delete-product'><i className='bx bx-trash'></i></button>
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
                    onClick={() => dispatch(checkoutCartThunk())}
                >Checkout</button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;