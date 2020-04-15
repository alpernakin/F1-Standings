import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './app.scss';
import Home from './app/pages/home/home';
import Details from './app/pages/details/details';

const appRoutes = [
    {
        path: '/home',
        component: Home
    },
    {
        path: '/details/:season',
        component: Details
    }
];

export default class App extends Component<{}, {}> {
    render() {
        return (
            <div className="app-container">
                <div className="app-content">
                    {/** NAV-BAR HERE */}
                    <Switch>
                        <Route exact path="/" render={() => (<Redirect to="/home"></Redirect>)} />
                        {appRoutes.map(route => <Route path={route.path} component={route.component} />)}
                    </Switch>
                    {/** FOOTER HERE */}
                </div>
            </div>
        );
    }
}