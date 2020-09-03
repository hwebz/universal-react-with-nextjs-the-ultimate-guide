import React, { Component } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/layout';

class About extends Component {
    
    static async getInitialProps() {
        const res = await fetch('https://api.github.com/users/hwebz')
        const data = await res.json();

        return { user: data };
    }

    render() {
        const { user } = this.props; 
        return (
            <Layout title="About">
                <p>{user.name}</p>
                <p>{user.bio}</p>
                <img src={user.avatar_url}
                    alt="JavaScript"
                    height="200px"
                />
            </Layout>
        );
    }
};

export default About;