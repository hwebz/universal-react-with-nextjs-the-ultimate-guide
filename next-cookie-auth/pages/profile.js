import Layout from '../components/Layout';
import { getUserProfile, authInitialProps } from "../lib/auth";

class Profile extends React.Component {
    
    state = {
        user: null
    };
    
    componentDidMount() {
        getUserProfile()
            .then(user => {
                this.setState({ user });
            });
    }

    render() {
        const { user } = this.state;

        return (
            <Layout title="My Profile" {...this.props}>
                <div>{JSON.stringify(user, null, 2)}</div>
            </Layout>
        )
    }
}

Profile.getInitialProps = authInitialProps();

export default Profile;