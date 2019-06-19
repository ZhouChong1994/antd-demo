import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import App from './App';
import Test from './test';
import { LocaleProvider  } from 'antd'
import * as serviceWorker from './serviceWorker';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
ReactDOM.render(
    <LocaleProvider locale={zh_CN}>
        <Router>
            <App />
        </Router>
    </LocaleProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
