// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';

// Instruments
import Styles from './styles.m.css';

export default class Login extends Component {
    static propTypes = {
        _login:          func.isRequired,
    }

    _handleClick = (event) => {
        event.preventDefault();
        this.props._login();
    }

    render() {
        return (
            <Link 
                className = { Styles.login } 
                to = '/profile'
                onClick = { this._handleClick } >
                Click here to log in
            </Link>
        );
    }
}
