import React, { Component } from 'react';
import Head from './component/header/header'
import Foot from './component/footer/foot'
import { Router, Route} from 'react-router-dom';

class test extends Component {
    render() {
        return (
            <Router >
                <div>
                    <Route path="/" component={Foot} />
                    <Route exact path="/Page1" component={Head} />
                </div>
            </Router>
        )
    }
}

export default test;