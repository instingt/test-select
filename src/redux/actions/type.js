/* eslint-disable no-use-before-define */
// @flow

import type { Option } from '../../types';

export type Action =
  | { type: 'APP.START_COUNTRIES_REQUEST' }
  | { type: 'APP.REQUEST_COUNTRIES_SUCCESS', countries: Array<Option> }
  | { type: 'APP.REQUEST_COUNTRIES_FAILURE', error: string }
  | { type: 'APP.SAVE_COUNTRY', country: Option }

export type GetState = () => Object;
export type PromiseAction = Promise<Action>;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
