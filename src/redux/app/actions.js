import axios from 'axios';

export const START_COUNTRIES_REQUEST = 'APP.START_COUNTRIES_REQUEST';
export const REQUEST_COUNTRIES_SUCCESS = 'APP.REQUEST_COUNTRIES_SUCCESS';
export const REQUEST_COUNTRIES_FAILURE = 'APP.REQUEST_COUNTRIES_FAILURE';
export const SAVE_COUNTRY = 'APP.SAVE_COUNTRY';

export const requestCountriesSuccess = countries => ({
  type: REQUEST_COUNTRIES_SUCCESS,
  payload: countries,
});

export const requestCountriesFailure = error => ({
  type: REQUEST_COUNTRIES_FAILURE,
  error,
});

export const startCountriesRequest = () => (dispatch) => {
  dispatch({
    type: START_COUNTRIES_REQUEST,
  });

  axios
    .get('/counties.json')
    .then(res => res.data)
    .then(data => Object.entries(data.countries).map(([value, label]) => ({
      value,
      label,
    })))
    .then(countries => dispatch(requestCountriesSuccess(countries)))
    .catch(err => (dispatch(requestCountriesFailure(err.message ? err.message : 'Ошибка сервера'))));
};

export const saveCountry = value => ({
  type: SAVE_COUNTRY,
  payload: value,
});
