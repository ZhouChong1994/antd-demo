import React, {Component} from 'react';
import {Switch, Route, Redirect, BrowserRouter as Router} from 'react-router-dom'

import Calendar from '../component/content/calendarCpt';
import Page from '../component/page'
import Search from '../component/content/search'
import Speech from '../component/content/speech'
import Weather from '../component/content/weather/weather'


export default class Myroute extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/calendar" push/>}/>
                <Route exact path='/calendar' component={Calendar}/>
                <Route exact path='/card' component={Search}/>
                <Route exact path='/lamp' component={Speech}/>
                <Route exact path='/example' component={Page}/>
                <Route exact path='/example/1' component={Weather}/>
                <Route exact path='/example/2' component={Page}/>
                <Route exact path='/example/3' component={Page}/>
                <Route exact path='/example/4' component={Page}/>
            </Switch>
        )
    }
}
