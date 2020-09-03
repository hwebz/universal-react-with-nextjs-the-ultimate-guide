import { loginUser } from '../lib/auth';

class LoginForm extends React.Component {

    state = {
        email: '',
        password: ''
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
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input type="email" name="email" placeholder="Email" onChange={this.handleChange} />
                </div>
                <div>
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                </div>
                <button>Login</button>
            </form>
        )
    }
}

export default LoginForm;