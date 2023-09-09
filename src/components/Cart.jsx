import React, { useState } from 'react';
import { useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk, checkoutCartThunk } from '../store/slices/cart.slice';

const Cart = ({ show, handleClose }) => {
    const [total,setTotal] = useState(0)
    const dispatch = useDispatch()
    const cartProducts = useSelector(state => state.cart)
    // const [total, setTotal] = useState(0)

    useEffect(() => {
        dispatch(getCartThunk());
    }, [])
    if (cartProducts.length) {
        if (cartProducts?.length > 1) {
            let add = 0
            for (const product of cartProducts) {
                add += parseFloat(product.product.price * product.quantity)
            }
            add!==total&&setTotal(add)
        } else {
            // total = cartProducts?.[0].price * cartProducts?.[0].productsInCart?.quantity
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
                                <img src={product.product.images[0].url} alt="imagen" />
                                <span className='cart-brand-product'>{product.product.brand}</span>
                                <span className='cart-title-product' >{product.product.title}</span>
                                <span className='cart-quantity-product'>quantity: {product.quantity}</span>
                                <span className='cart-total-text'>Total</span>
                                <span className='cart-total-product'>${product.product.price * product.quantity}</span>
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