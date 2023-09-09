import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProductsThunk,
  filterProductsThunk,
  filterQueryThunk,
} from "../store/slices/products.slice";
import { addCartThunk } from "../store/slices/cart.slice";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(Infinity);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(getProductsThunk());

    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
      .then((res) => setCategories(res.data));
    !filteredProducts[0] && setFilteredProducts(products);
  }, [products]);

  const addToCart = (id) => {
    const dataProduct = {
      productId: id,
      quantity: 1,
    };
    dispatch(addCartThunk(dataProduct));
  };

  const filterPrice = () => {
    const filtered = products.filter(
      (product) =>
        parseInt(product.price) >= priceFrom &&
        parseInt(product.price) <= priceTo
    );
    setFilteredProducts(filtered);
  };
  const filterName = () => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(inputSearch.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="home-container">
      <div className="filters-container">
        <div>
          <h2>Price</h2>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              onChange={(e) =>
                setPriceFrom(e.target.value ? e.target.value : 0)
              }
            >
              <Form.Label>From</Form.Label>
              <Form.Control type="number" />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicPassword"
              onChange={(e) =>
                setPriceTo(e.target.value ? e.target.value : Infinity)
              }
            >
              <Form.Label>To</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
            <Button
              className="btn-submit"
              type="button"
              onClick={() => filterPrice()}
            >
              filter
            </Button>
          </Form>
        </div>
        <hr />
        <div className="categories">
          <h2>Category</h2>
          {categories?.map((category) => (
            <p
              key={category.id}
              onClick={() => dispatch(filterQueryThunk(category.id))}
              className="category-name"
            >
              {category.name}
            </p>
          ))}
        </div>
      </div>

      <div className="products">
        <div className="input-search">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="What are you looking for?"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />
            <Button
              className="filter-name-button"
              variant="outline-secondary"
              id="button-addon2"
              onClick={() => {
                filterName();
              }}
            >
              Filter
            </Button>
          </InputGroup>
        </div>
        <div className="products-container">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <Link
                className="product-items"
                to={`/product/${product.id}`}
                key={product.id}
              >
                <div>
                  <img
                    className="product-image"
                    src={product.images[0].url}
                    alt=""
                  />
                </div>
                <div className="card-description">
                  <span className="title">
                    {" "}
                    <b> {product.title} </b>{" "}
                  </span>
                  <div className="price">
                    <span>Price </span>
                    <span> ${product.price}</span>
                  </div>
                </div>
              </Link>
              <button
                className="add-to-cart-card"
                type="submit"
                onClick={() => addToCart(product.id)}
              >
                <i className="bx bx-cart"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
