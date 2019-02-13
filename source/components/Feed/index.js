// Core
import React, { Component } from 'react';
 
// Components
import { withProfile } from 'components/HOC/withProfile';
import Catcher from 'components/Catcher';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
import { api, TOKEN, GROUP_ID } from 'config/api';

// Instruments
import Styles from './styles.m.css';
import { getUniqueID } from 'instruments';
import { socket } from 'socket/init';

@withProfile
export default class Feed extends Component {
    state = {
        posts: [],
        isPostfetching: false
    }

    componentDidMount () {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._fetchPosts();

        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: [createdPost, ...posts],
                }));
            }
        });

        socket.on('remove', (postJSON) => {
            const { data: removedPost, meta } = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id != removedPost.id),
                }));
            }
        });

        socket.on('like', (postJSON) => {
            const { data: likedPost, meta } = JSON.parse(postJSON);

            this.setState(({ posts }) => ({
                posts: posts.map((post) => post.id === likedPost.id ? likedPost : post),
            }));
        });
    }

    componentWillUnmount () {
        socket.removeListener('create');
        socket.removeListener('remove');
        socket.removeListener('like');
    }

    _setPostFetchingState = (state) => {
        this.setState({
            isPostfetching: state
        });
    }

    _createPost = async (comment) => {
        this._setPostFetchingState(true);

        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN,
            },
            body: JSON.stringify({ comment }),
        });

        const { data: post } = await response.json();

        this.setState(({ posts }) => ({
            posts: [post, ...posts],
            isPostfetching: false
        }));
    }

    _fetchPosts = async () => {
        this._setPostFetchingState(true);

        const response = await fetch(api, {
            method: 'GET',
        });

        const { data: posts } = await response.json();

        this.setState({
            posts,
            isPostfetching: false,
        });
    }

    _likePost = async (id) => {
        this._setPostFetchingState(true);

        const response = await fetch(`${api}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: TOKEN,
            },
        });

        const { data: likedPost } = await response.json();

        this.setState(({ posts }) => ({
            posts: posts.map(
                (post) => post.id === likedPost.id ? likedPost : post
            ),
            isPostfetching: false
        }));
    }

    _removePost = async (id) => {
        this._setPostFetchingState(true);

        await fetch(`${api}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        this.setState(({ posts }) => ({
            posts: posts.filter(
                (post) => post.id != id
            ),
            isPostfetching: false
        }));
    }

    render() {
        const { posts, isPostfetching } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Catcher key = { post.id } >
                    <Post 
                        {...post} 
                        _likePost = { this._likePost } 
                        _removePost = {this._removePost}
                    />
                </Catcher>
            );
        });

        return (
            <section className = { Styles.feed } >
                <Spinner isSpinning = { isPostfetching } />
                <StatusBar />
                <Composer 
                    _createPost = {this._createPost} />
                { postsJSX }
            </section>
        );
    }
}
