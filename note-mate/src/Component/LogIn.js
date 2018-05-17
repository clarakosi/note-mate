import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loggedIn, getNotes} from '../Actions';
import Navigation from './Navigation';

import { graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'react-apollo';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            newAccount: false
        }
    }

    loginChangeHandler = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    loginAuth = event => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;

        if (username && password) {
            return this.props.mutate({
                variables: { username: username, password: password }
            })
            .then(result => {
                this.props.loggedIn(result.data.tokenAuth.token);
                // this.props.getNotes([])
                console.log(this.props.data)
                // if (typeof this.props.data.notes == 'array') {
                return this.props.getNotes(this.props.data.notes);
                // }
         
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    signUpToggle = event => {
        event.preventDefault();
        const active = this.state.newAccount;
        this.setState({newAccount: !active});

    }

    render() {
        return (
            <div className='HomePage'>
                <Navigation />
                <div className='Login'>
                <form style={this.state.newAccount ? {display: 'none'} : null}>
                    <div>Sign In</div>
                    <input type='text' placeholder='username' value ={this.state.username} onChange={this.loginChangeHandler} name='username' required />
                    <br/>
                    <br/>
                    <input type='text' placeholder='password' value ={this.state.password} onChange={this.loginChangeHandler} name='password' required />
                    <br/>
                    <br/>
                    <button onClick={this.loginAuth}>Login</button>
                    <br/>
                    <br/>
                    <br/>
                    <p>Need an account? <a href='' onClick={this.signUpToggle}>Sign Up</a></p>
                </form>
                <form style={this.state.newAccount ? null : {display: 'none'}}>
                    <div>Sign Up</div>
                    <input type='text' placeholder='username' value ={this.state.username} onChange={this.loginChangeHandler} name='username' required />
                    <br/>
                    <br/>
                    <input type='text' placeholder='password' value ={this.state.password} onChange={this.loginChangeHandler} name='password' required />
                    <br/>
                    <br/>
                    <button onClick={this.loginAuth}>Sign Up</button>
                    <br/>
                    <br/>
                    <br/>
                    <p>Want to Sign In? <a href='' onClick={this.signUpToggle}>LogIn</a></p>
                </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn
    }
}

const logIn = gql`
    mutation tokenAuth($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
        }
    }
`;

const gettingNotes = gql`
    query gettingNotes {
        notes {
            id
            title
            content
        }
    }
`;

const logInComponent = compose(graphql(logIn), graphql(gettingNotes))(LogIn)
export default connect(mapStateToProps, {loggedIn, getNotes}) (logInComponent);