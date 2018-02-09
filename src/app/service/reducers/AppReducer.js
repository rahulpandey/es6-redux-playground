import { ActionCreators } from "../actions";
const appReducer = (state = { isLoading: true }, action) => {
  switch (action.type) {
    case ActionCreators.REQUEST_MOVIES:
      return Object.assign({}, state, { isLoading: true });
    case ActionCreators.RECEIVE_MOVIES:
      return Object.assign({}, state, {
        isLoading: false,
        movies: action.payload
      });
    default:
      return state;
  }
};
export default appReducer;
