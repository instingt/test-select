import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function CountryViewerContainer({ country }) {
  return country ?
    <span>Выбрана страна с кодом <strong>{ country }</strong></span> :
    <span>Страна не выбрана</span>;
}

CountryViewerContainer.propTypes = {
  country: PropTypes.string.isRequired,
};

function mapStateToProps({ app: { country } }) {
  return {
    country,
  };
}

export default connect(mapStateToProps)(CountryViewerContainer);
