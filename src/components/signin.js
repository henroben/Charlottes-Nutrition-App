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
    onSigninGit() {
        console.log('git signin called');
        let {dispatch} = this.props;
        dispatch(startLogin());
    }
    render() {
        return(
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <div className="panel panel-default">
                        <div className="panel-heading">Sign In</div>
                        <div className="panel-body">
                            <p>Please sign in with your GitHub account to continue</p>
                            <button className="btn btn-primary btn-block" onClick={this.onSigninGit.bind(this)}>Login with GitHub</button>
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