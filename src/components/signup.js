import React, { Component } from 'react';
import { connect } from 'react-redux';

class SignUp extends Component {
    render() {
        return(
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="usrname">User Name:</label>
                        <input type="text" className="form-control" id="usrname" placeholder="Pick a user name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="usrpassword">Enter a Password:</label>
                        <input type="password" className="form-control" id="usrpassword" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="usrpasswordcheck">Confirm your Password:</label>
                        <input type="password" className="form-control" id="usrpasswordcheck" />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                </div>
                <div className="col-sm-3"></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state,
    }
}

export default connect(mapStateToProps, {})(SignUp);