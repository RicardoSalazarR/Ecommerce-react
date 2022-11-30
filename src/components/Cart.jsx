import React, { useState } from 'react';
import { useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk } from '../store/slices/cart.slice';

const Cart = ({show,handleClose}) => {

    const dispatch = useDispatch()
    const cartProducts = useSelector(state=>state.cart)

    useEffect(()=>{
        dispatch(getCartThunk());
    },[])

    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div>
                    {
                        cartProducts.map(product=>(
                            <div key={product.id}>
                                <span>{product.brand}</span>
                                <span>{product.title}</span>
                                <span>{product.quantity}</span>
                            </div>
                        ))
                    }
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;