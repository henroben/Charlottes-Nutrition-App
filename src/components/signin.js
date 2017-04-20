import React, { Component, PropTypes } from 'react';
import * as Redux from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import firebase from 'firebase';

import * as actions from './../actions/index';

class SignIn extends Component {
    componentDidUpdate() {
        console.log('did update');
        if(firebase.auth().currentUser) {
            console.log('logged in, redirect');
            this.props.history.push('/foodsearch');
        }
    }

    handleFormSubmit(formProps) {
        console.log('formprops', formProps);
        this.props.emailLogin(formProps.email, formProps.password);
    }

    renderError() {
        if(this.props.errorMessage) {
            return <div className="alert alert-danger">{this.props.errorMessage}</div>;
        }
    }

    renderField(field) {
        let iconClass;
        switch(field.input.name) {
            case 'email':
                iconClass = 'fa fa-envelope-o fa-fw';
                break;
            case 'password':
                iconClass = 'fa fa-key fa-fw';
                break;
        }
        return (
            <div>
                <div className="input-group margin-bottom-sm">
                    <span className="input-group-addon"><i className={iconClass}></i></span>
                    <input {...field.input} type={field.type} className="form-control" placeholder={field.placeholder} required />
                </div>
                {field.meta.touched && field.meta.error && <div className="alert alert-danger">{field.meta.error}</div>}
            </div>
        );
    }

    onSignin(authMethod) {
        this.props.startLogin(authMethod);
    }
    render() {
        const { handleSubmit, fields: { email, password, passwordConfirm }, pristine } = this.props;
        return(
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <div className="panel panel-default">
                        <div className="panel-heading"><strong>Sign In With Your Account</strong></div>
                        <div className="panel-body">
                            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                                <fieldset className="form-group">
                                    <Field {...email} className="form-control" type="email" name="email" placeholder="Email address" component={this.renderField} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <Field {...password} type="password" name="password" placeholder="Please enter a password" component={this.renderField} />
                                </fieldset>
                                {this.renderError()}
                                <div className="form-group">
                                    <button action="submit" disabled={pristine} className="btn btn-primary btn-block">Sign In</button>
                                </div>
                            </form>
                            <hr/>
                            <p>Or sign in with your Facebook account to continue</p>
                            <p><button className="btn btn-primary btn-block" onClick={this.onSignin.bind(this, 'facebook')}>Sign in with Facebook</button></p>
                            <hr/>
                            <p>Or sign in with your GitHub account to continue</p>
                            <p><button className="btn btn-primary btn-block" onClick={this.onSignin.bind(this, 'github')}>Sign in with GitHub</button></p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3"></div>
            </div>
        );
    }
}

function validate(formProps) {
    const errors = {};

    if(!formProps.email) {
        errors.email = 'Please enter your email.'
    }

    if(formProps.email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formProps.email)) {
        errors.email = 'Please enter a valid email.'
    }

    if(!formProps.password) {
        errors.password = 'Please enter your password.'
    }

    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

SignIn = reduxForm({
    form: 'signin',
    fields: ['email', 'password'],
    validate
})(SignIn);

export default SignIn = Redux.connect(mapStateToProps, actions)(SignIn);