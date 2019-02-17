// Core
import React from 'react';
import { number } from 'prop-types';

// Instruments
import Styles from './styles.m.css';

// Components
// import { withProfile } from 'components/HOC/withProfile';

const Counter = ({ count }) => (
    <section className = { Styles.counter}>Posts count: {count}</section>
);

Counter.propTypes = {
    count: number.isRequired,
};

export default Counter;