// @flow

import type { Option } from '../../types';
import type { Action } from '../actions/type';

type State = {
  +loading: boolean,
  +error: string,
  +countries: Array<Option>,
  +country: Option | null,
}

const initialState: State = {
  loading: false,
  error: '',
  countries: [],
  country: null,
};

export default function (state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'APP.START_COUNTRIES_REQUEST':
      return Object.assign({}, state, {
        loading: true,
        countries: [],
        error: '',
      });
    case 'APP.REQUEST_COUNTRIES_SUCCESS':
      return Object.assign({}, state, {
        loading: false,
        countries: action.countries,
        error: '',
      });
    case 'APP.REQUEST_COUNTRIES_FAILURE':
      return Object.assign({}, state, {
        loading: false,
        countries: [],
        error: action.error,
      });
    case 'APP.SAVE_COUNTRY':
      return {
        loading: state.loading,
        error: state.error,
        countries: state.countries,
        country: action.country,
      };
    default:
      return state;
  }
}
