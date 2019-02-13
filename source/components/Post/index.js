// Core
import React, { Component } from 'react';
import moment from 'moment';
import { func, string, array, number } from 'prop-types';

// Components
import { Consumer, withProfile } from 'components/HOC/withProfile';
import Like from 'components/Like';

// Instruments
import Styles from './styles.m.css';

@withProfile
export default class Post extends Component {
    static propTypes = {
        id: string.isRequired,
        likes: array.isRequired,
        comment: string.isRequired,
        created: number.isRequired,
        _likePost: func.isRequired,
    }

    _removePost = () => {
        const { _removePost, id } = this.props;

        _removePost(id);
    }

    _getCross() {
        const {
            firstName,
            lastName,
            currentUserFirstName,
            currentUserLastName
        } = this.props;

        return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`
        ? <span className = { Styles.cross } onClick = { this._removePost }></span>
        : null
    }

    render() {
        const { 
            avatar, 
            comment, 
            created, 
            firstName,
            lastName,
            _likePost, 
            id, 
            likes 
        } = this.props;

        const cross = this._getCross();

        return (
            <section className = { Styles.post } >
                {cross}
                <img src = { avatar } />
                <a>{`${firstName} ${lastName}`}</a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{ comment }</p>
                <Like 
                    id = { id } 
                    likes = { likes }
                    _likePost = { _likePost }
                    />
            </section>
        );
    }
}
