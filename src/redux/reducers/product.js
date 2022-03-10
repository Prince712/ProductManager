import {GET_PRODUCTS} from '../types';
import update from 'immutability-helper';
const initialState = {
  loading: true,
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return update(state, {
        products: {$set: action.payload},
        loading: {$set: false},
      });
    default:
      return state;
  }
};

export default product;
