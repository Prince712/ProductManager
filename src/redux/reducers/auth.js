import {
  REGISTER_USER,
  LOGOUT,
} from '../types';
import update from 'immutability-helper';
const initialState = {
  loggedInUser: null,
  // map:{latitude: 21.1667, longitude: 72.8333},
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return update(state, {
        loggedInUser: {$set: action.payload},
      });

    case LOGOUT:
      return update(state, {loggedInUser: {$set: null}});

    default:
      return state;
  }
};

export default auth;
