import React, { Component, PropTypes } from 'react';
import * as Redux from 'react-redux';
import firebase from 'firebase';
import { browserHistory } from 'react-router';

import { startLogin } from './../actions/index';

class SignIn extends Component {
    componentDidUpdate() {
        console.log('did update');
        if(firebase.auth().currentUser) {
            console.log('logged in, redirect');
            this.props.history.push('/foodsearch');
        }
    }
    onSignin(authMethod) {
        let {dispatch} = this.props;
        dispatch(startLogin(authMethod));
    }
    render() {
        return(
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <div className="panel panel-default">
                        <div className="panel-heading">Sign In With your Facebook or Github account</div>
                        <div className="panel-body">
                            <form action="">
                                <div className="form-group">
                                    <label htmlFor="usrname">Email Address:</label>
                                    <input type="email" className="form-control" id="usrname" placeholder="Enter your email address" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="usrpassword">Enter a Password:</label>
                                    <input type="password" className="form-control" id="usrpassword" required />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Sign In</button>
                                </div>
                            </form>
                            <hr/>
                            <p>Please sign in with your Facebook account to continue</p>
                            <p><button className="btn btn-primary btn-block" onClick={this.onSignin.bind(this, 'facebook')}>Sign in with Facebook</button></p>
                            <hr/>
                            <p>Please sign in with your GitHub account to continue</p>
                            <p><button className="btn btn-primary btn-block" onClick={this.onSignin.bind(this, 'github')}>Sign in with GitHub</button></p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3"></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state
    }
}

export default Redux.connect(mapStateToProps)(SignIn);