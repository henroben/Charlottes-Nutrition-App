import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignIn from './signin';

class DisplaySignIn extends Component {
    render() {
        return(
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <SignIn />
                </div>
                <div className="col-sm-3"></div>
            </div>
        );
    }
}

export default connect()(DisplaySignIn);