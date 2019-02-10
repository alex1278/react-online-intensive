// Core
import React, { Component } from 'react';
 
// Components
import { withProfile } from 'components/HOC/withProfile';
import Catcher from 'components/Catcher';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
import { api, TOKEN } from 'config/api';

// Instruments
import Styles from './styles.m.css';
import { getUniqueID } from 'instruments'
import { delay } from 'instruments'

@withProfile
export default class Feed extends Component {
    state = {
        posts: [],
        isPostfetching: false
    }

    componentDidMount () {
        this._fetchPosts();
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
            header: {
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
        const { currentUserFirstName, currentUserLastName } = this.props;
        this._setPostFetchingState(true);

        await delay(1200);

        const newPosts = this.state.posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id: getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName: currentUserLastName
                        }
                    ]
                }
            }
            return post;
        });

        this.setState({
            posts: newPosts,
            isPostfetching: false
        })
    }

    _removePost = async (id) => {
        this._setPostFetchingState(true);

        await delay(1200);

        const newPosts = this.state.posts.filter((post) => post.id !== id );

        this.setState({
            posts: newPosts,
            isPostfetching: false
        })
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
