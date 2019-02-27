// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

// Instruments
import avatar from 'theme/assets/ira';

// Components
import Catcher from 'components/Catcher';
import Login from 'components/Login';
import StatusBar from 'components/StatusBar';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import { Provider } from 'components/HOC/withProfile';

const options = {
    avatar,
    currentUserFirstName: 'Ирина',
    currentUserLastName: 'Комаренець',
}

@hot(module)
export default class App extends Component {
    state = {
        authenticated: false
    }

    _login = () => {
        this.setState({
            authenticated: true
        })
    }

    render() {
        return (
            this.state.authenticated ?
            <Catcher>
                <Provider value = { options }>
                    <StatusBar />
                    <Switch>
                        <Route component = { Feed } path = '/feed' />
                        <Route component = { Profile } path = '/profile' />
                        <Route component = { Login } path = '/login' />
                    </Switch>
                    <Redirect to = '/profile' />
                </Provider>
            </Catcher>
            :
            <div>
                <Route 
                    path = '/login'
                    render = { () => <Login _login = { this._login } />} 
                    />
                <Redirect to = '/login' />
            </div>
        );
    }
}
