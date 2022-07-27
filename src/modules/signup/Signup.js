import React, { Component } from 'react';
import './Signup.css';
import { Link, Redirect } from 'react-router-dom';
import { signup } from '../../services/auth.service';

import Alert from 'react-s-alert';
import SocialSignup from '../../components/SocialLogin';


class Signup extends Component {
    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }

        return (
            <div className="signup-container">
          
                <div className="signup-content">
                    <h1 className="signup-title">Signup to Buana Varia Komputama</h1>
                    <SocialSignup type={"sign_up"}/>
                    <div className="or-separator">
                        <span className="or-text">OR</span>
                    </div>
                    <SignupForm {...this.props} />
                    <span className="login-link">Already have an account? <Link to="/login">Login!</Link></span>
                </div>
            </div>
        );
    }
}

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            position: '',
            password: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });        
    }

    handleSubmit(event) {
        event.preventDefault();   

        const signUpRequest = Object.assign({}, this.state);

        signup(signUpRequest)
        .then(response => {
            Alert.success("You're successfully registered. Please login to continue!");
            this.props.history.push("/login");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
        });
    }

    renderField(entityName, type){
        let placeholder = entityName.charAt(0).toUpperCase() + entityName.slice(1)
        return (
            <div className="form-item">
                <input type={type} name={entityName} 
                    className="form-control" placeholder={placeholder}
                    value={this.state[entityName]} onChange={this.handleInputChange} required/>
            </div>
        )
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.renderField('name', 'text')}
                {this.renderField('email', 'email')}
                {this.renderField('position', 'text')}
                {this.renderField('password', 'password')}
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary" >Sign Up</button>
                </div>
            </form>                    

        );
    }
}

export default Signup