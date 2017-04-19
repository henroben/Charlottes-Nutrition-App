import React, { Component, PropTypes } from 'react';
import * as Redux from 'react-redux';
import { browserHistory } from 'react-router';

import { startLogin } from './../actions/index';

class SignIn extends Component {
    componentDidUpdate() {
        console.log('did update');
        if(this.props.auth.uid) {
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
                        <div className="panel-heading">Sign In With Facebook</div>
                        <div className="panel-body">
                            <p>Please sign in with your Facebook account to continue</p>
                            <button className="btn btn-primary btn-block" onClick={this.onSignin.bind(this, 'facebook')}>Login with Facebook</button>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">Sign In With Github</div>
                        <div className="panel-body">
                            <p>Please sign in with your GitHub account to continue</p>
                            <button className="btn btn-primary btn-block" onClick={this.onSignin.bind(this, 'github')}>Login with GitHub</button>
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