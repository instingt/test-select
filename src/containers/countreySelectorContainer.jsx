import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import Select from '../components/Select/index';
import { saveCountry, startCountriesRequest } from '../redux/app/actions';

class CountySelectorContainer extends Component {
  static propTypes = {
    countries: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    loadingCounties: PropTypes.func.isRequired,
    onSaveCountry: PropTypes.func.isRequired,
    country: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { countries, loadingCounties } = this.props;
    if (countries.length === 0) {
      loadingCounties();
    }
  }

  render() {
    const {
      loading,
      error,
      countries,
      onSaveCountry,
      country,
    } = this.props;
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <span className="error">{ error }</span>;
    }

    if (countries.length === 0) {
      return <span className="error">Нет данных</span>;
    }

    return <Select options={ countries } placeholder="Выберете страну" onChange={ onSaveCountry } value={ country } />;
  }
}

function mapStateToProps({ app: { loading, error, countries, country } }) {
  return {
    loading,
    error,
    countries,
    country,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadingCounties: () => dispatch(startCountriesRequest()),
    onSaveCountry: country => dispatch(saveCountry(country)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CountySelectorContainer);
