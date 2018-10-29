import { SET_CURRENT_USER, GET_OAUTH2_USERS } from "../actions/types";

const initialState = {
  validToken: false,
  user: {}
};

const booleanActionPayload = payload => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        user: action.payload
      };

    case GET_OAUTH2_USERS:
      return {
        ...state,
        authenticated: true,
        user: action.payload
      };

    default:
      return state;
  }
}
