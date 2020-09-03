import Layout from '../components/Layout';
import { getUserProfile } from "../lib/auth";

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
            <Layout title="My Profile">
                <div>{JSON.stringify(user, null, 2)}</div>
            </Layout>
        )
    }
}

export default Profile;