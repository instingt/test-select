// @flow

import axios from 'axios';
import type { Option } from '../../types';
import type { Action, Dispatch, ThunkAction } from './type';

export function requestCountriesSuccess(countries: Array<Option>): Action {
  return {
    type: 'APP.REQUEST_COUNTRIES_SUCCESS',
    countries,
  };
}

export function requestCountriesFailure(error: string): Action {
  return {
    type: 'APP.REQUEST_COUNTRIES_FAILURE',
    error,
  };
}

export function startCountriesRequest(): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'APP.START_COUNTRIES_REQUEST',
    });

    return axios
      .get('/counties.json')
      .then(res => res.data)
      .then(data => Object.entries(data.countries).map(([value, label]) => ({
        value,
        label,
      })))
      .then(countries => dispatch(requestCountriesSuccess(countries)))
      .catch(err => (dispatch(requestCountriesFailure(err.message ? err.message : 'Ошибка сервера'))));
  };
}

export function saveCountry(country: Option) {
  return {
    type: 'APP.SAVE_COUNTRY',
    country,
  };
}
