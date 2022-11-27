import React from 'react';
import { Link } from "react-router-dom";
const ProductCard = ({product}) => {

    console.log(product);
    return (
        <Link to={`/product/${product.id}`} className='product-card'>
            <div>
            <img className='product-img' src={product.productImgs[0]} alt="" />
            </div>
            <div>
                <p>{product.title}</p>
                <span>price</span>
                <p>{product.price}</p>
                <button>add to car</button>
            </div>
        </Link>
    );
};

export default ProductCard;