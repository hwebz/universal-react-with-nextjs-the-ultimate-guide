import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/layout';
import Error from './_error';

class About extends Component {
    
    static async getInitialProps() {
        const res = await fetch('https://api.github.com/users/hwebzfawefe');
        const statusCode = res.status > 200 ? res.status : false;
        const data = await res.json();

        return { 
            user: data,
            statusCode
         };
    }

    render() {
        const { user, statusCode } = this.props; 

        if (statusCode) {
            return <Error statusCode={statusCode} />
        }

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