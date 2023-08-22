import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { setIsLoading } from './isLoading.slice'
export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload
        }

    }
})

export const getProductsThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/products')
        .then(res => dispatch(setProducts(res.data)))
        .finally(() => dispatch(setIsLoading(false)))
}

export const filterProductsThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
        .then((res) => dispatch(dispatch(setProducts(res.data))))
        .finally(() => dispatch(setIsLoading(false)));
}

export const filterQueryThunk = (inputSearch) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${inputSearch}`)
        .then((res) => dispatch(dispatch(setProducts(res.data))))
        .finally(() => dispatch(setIsLoading(false)));
}


export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
