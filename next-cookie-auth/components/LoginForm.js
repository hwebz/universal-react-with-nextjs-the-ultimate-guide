import { loginUser } from '../lib/auth';
import Router from 'next/router';

class LoginForm extends React.Component {

    state = {
        email: 'Sincere@april.biz',
        password: 'hildegard.org',
        error: '',
        isLoading: false
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        const { email, password } = this.state;
        event.preventDefault();

        this.setState({
            error: '',
            isLoading: true
        });
        
        loginUser(email, password).then(() => {
            Router.push('/profile');
        }).catch(this.showError);
    }

    showError = err => {
        console.log(err);
        this.setState({
            error: err.response && err.response.data || err.message,
            isLoading: false
        });
    }

    render() {
        const { email, password, error, isLoading } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input type="email" name="email" placeholder="Email" defaultValue={email} onChange={this.handleChange} />
                </div>
                <div>
                    <input type="password" name="password" placeholder="Password" defaultValue={password} onChange={this.handleChange} />
                </div>
                <button disabled={isLoading} type="submit">{isLoading ? 'Sending' : 'Submit'}</button>
                <div>
                    {error && (
                        <div>{error}</div>
                    )}
                </div>
            </form>
        )
    }
}

export default LoginForm;