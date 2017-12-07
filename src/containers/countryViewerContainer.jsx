// @flow

import React from 'react';
import { connect } from 'react-redux';
import type { Option } from '../types';

type Props = {
  country: Option | null
}

function CountryViewerContainer({ country }: Props) {
  return country ?
    <span>Выбрана страна: <strong>{ country.label }</strong></span> :
    <span>Страна не выбрана</span>;
}

function mapStateToProps({ app: { country } }) {
  return {
    country,
  };
}

export default connect(mapStateToProps)(CountryViewerContainer);
