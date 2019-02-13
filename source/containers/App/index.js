// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// Instruments
import avatar from 'theme/assets/ira';

// Components
import Catcher from 'components/Catcher';
import Feed from 'components/Feed';
import { Provider } from 'components/HOC/withProfile';

const options = {
    avatar,
    currentUserFirstName: 'Ирина',
    currentUserLastName: 'Комаренець',
}

@hot(module)
export default class App extends Component {
    render() {
        return (
            <Catcher>
                <Provider value = { options }>
                    <Feed />
                </Provider>
            </Catcher>
        );
    }
}
