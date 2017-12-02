import React from 'react';
import { Provider } from 'react-redux';
import CountrySelectorContainer from '../../containers/countreySelectorContainer';
import CountryViewerContainer from '../../containers/countryViewerContainer';
import store from '../../redux/createStore';

export default function App() {
  return (
    <Provider store={ store }>
      <div className="App">
        <h1>Hello IQ Option</h1>
        <CountrySelectorContainer />
        <CountryViewerContainer />
      </div>
    </Provider>
  );
}
