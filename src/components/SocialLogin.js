import { GOOGLE_AUTH_URL } from '../constants';
import googleLogo from '../img/google-logo.png';
import React, { Component } from 'react';

class SocialLogin extends Component {
    
    render() {
        let type = !!this.props.type && this.props.type === 'sign_in' ? 'Log In' : 'Sign Up'
        return (
            <div className="social-login">
                <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                    <img style={{marginTop: "0px"}} src={googleLogo} alt="Google" /> {type} with Google
                </a>
            </div>
        );
    }
}

export default SocialLogin;