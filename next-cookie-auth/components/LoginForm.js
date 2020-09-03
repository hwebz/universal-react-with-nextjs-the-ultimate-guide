import { loginUser } from '../lib/auth';

class LoginForm extends React.Component {

    state = {
        email: 'Sincere@april.biz',
        password: 'hildegard.org'
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        const { email, password } = this.state;
        event.preventDefault();
        
        loginUser(email, password);
    }

    render() {
        const { email, password } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input type="email" name="email" placeholder="Email" defaultValue={email} onChange={this.handleChange} />
                </div>
                <div>
                    <input type="password" name="password" placeholder="Password" defaultValue={password} onChange={this.handleChange} />
                </div>
                <button>Login</button>
            </form>
        )
    }
}

export default LoginForm;