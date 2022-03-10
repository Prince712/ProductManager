import {REGISTER_USER, GET_PRODUCTS, LOGOUT} from '../types';
import axios from 'axios';

export const registerUser = data => async dispatch => {
  dispatch({
    type: REGISTER_USER,
    payload: data,
  });
};

export const getProducts = () => async dispatch => {
  let data = await axios
    .get('https://shopping-backend-test.herokuapp.com/getProducts')
    .then(responce => {
      dispatch({
        type: GET_PRODUCTS,
        payload: responce.data,
      });
      return responce.data;
    })
    .catch(e => {
      console.log(e);
    });
};

export const ProductAdd = params => async dispatch => {
  let data = await axios
    .post('https://shopping-backend-test.herokuapp.com/addProduct', params)
    .then(responce => {
      // dispatch({
      //   type: ADD_PRODUCT,
      //   payload: responce.data,
      // })
      return responce.data;
    })
    .catch(e => {
      console.log(e);
    });
};

export const logout = () => async dispatch => {
  dispatch({
    type: LOGOUT,
  });
};
