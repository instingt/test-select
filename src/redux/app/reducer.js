import { REQUEST_COUNTRIES_FAILURE, REQUEST_COUNTRIES_SUCCESS, SAVE_COUNTRY, START_COUNTRIES_REQUEST } from './actions';
import initialState from './initialSate';

export default function (state = initialState, action) {
  switch (action.type) {
    case START_COUNTRIES_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        countries: [],
        error: '',
      });
    case REQUEST_COUNTRIES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        countries: action.payload,
        error: '',
      });
    case REQUEST_COUNTRIES_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        countries: [],
        error: action.error,
      });
    case SAVE_COUNTRY:
      return Object.assign({}, state, {
        country: action.payload,
      });
    default:
      return state;
  }
}
