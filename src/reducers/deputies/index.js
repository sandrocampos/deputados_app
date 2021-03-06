import {
  GET_DEPUTIES,
  GET_MORE_DEPUTIES,
  GET_DEPUTIES_SUCCESS,
  GET_MORE_DEPUTIES_SUCCESS,
} from '../../actions/types';


const INITIAL_STATE = {
  loading: false,
  listOfDeputies: [],
  pagination: [],
  currentDeputy: {},
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DEPUTIES:
      return { ...state, loading: true };
    case GET_MORE_DEPUTIES:
      return { ...state, loading: true };
    case GET_DEPUTIES_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case GET_MORE_DEPUTIES_SUCCESS:
      return {
        ...state,
        listOfDeputies: [...state.listOfDeputies, ...action.payload.listOfDeputies],
        pagination: action.payload.pagination,
        loading: false,
      }
    default:
      return state;
  }
};
