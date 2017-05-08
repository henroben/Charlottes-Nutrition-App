import React, { Component } from 'react';
import * as Redux from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import * as actions from './../actions/index';

class UserSettings extends Component {
    render() {
        return(
            <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">
                    <div className="well well-sm">
                        <h1>Settings</h1>
                        <div className="row">
                            <div className="col-sm-12">
                                <form action="">
                                    <div className="form-group">
                                        <p><label htmlFor="sex">Sex</label></p>
                                        <p>
                                            <label className="radio-inline"><input type="radio" name="sex" /> <i className="fa fa-male"></i> Male</label>
                                            <label className="radio-inline"><input type="radio" name="sex" /> <i className="fa fa-female"></i> Female</label>
                                        </p>
                                    </div>
                                    <div className="form-group">
                                        <p><label htmlFor="age">Age</label></p>
                                        <p></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-1"></div>
            </div>
        );
    }
}

export default Redux.connect()(UserSettings);