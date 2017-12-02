/* eslint-disable react/jsx-filename-extension,class-property/rule-name */
import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
