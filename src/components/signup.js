import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from './../actions';

class SignUp extends Component {

    handleFormSubmit(formProps) {
        console.log('formprops', formProps);
        this.props.startCreateUser(formProps.email, formProps.password);
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
            case 'passwordConfirm':
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
                        <div className="panel-heading"><strong>Sign Up &amp; Create An Account</strong></div>
                        <div className="panel-body">
                            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                                <fieldset className="form-group">
                                    <Field {...email} className="form-control" type="email" name="email" placeholder="Email address" component={this.renderField} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <Field {...password} type="password" name="password" placeholder="Please enter a password" component={this.renderField} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <Field {...passwordConfirm} type="password" name="passwordConfirm" placeholder="Please confirm your password" component={this.renderField} />
                                </fieldset>
                                {this.renderError()}
                                <div className="form-group">
                                    <button action="submit" disabled={pristine} className="btn btn-primary btn-block">Sign Up</button>
                                </div>
                            </form>
                            <hr/>
                            <p>Or sign up with your Facebook or GitHub account</p>
                            <hr/>
                            <p><button className="btn btn-primary btn-block" onClick={this.onSignin.bind(this, 'facebook')}>Sign Up with Facebook</button></p>
                            <hr/>
                            <p><button className="btn btn-primary btn-block" onClick={this.onSignin.bind(this, 'github')}>Sign Up with GitHub</button></p>
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
        errors.email = 'Please enter an email.'
    }

    if(formProps.email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formProps.email)) {
        errors.email = 'Please enter a valid email.'
    }

    if(!formProps.password) {
        errors.password = 'Please enter a password.'
    }

    if(formProps.password && formProps.password.length < 8) {
        errors.password = 'Password must be 8 characters or more.'
    }
    if(formProps.password && formProps.password.search(/[a-z]/i) < 0) {
        errors.password = 'Password must contain at least one lowercase character.'
    }
    if(formProps.password && formProps.password.search(/[A-Z]/i) < 0) {
        errors.password = 'Password must contain at least one uppercase character.'
    }
    if(formProps.password && formProps.password.search(/[0-9]/) < 0) {
        errors.password = 'Password must contain at least one digit.'
    }


    if(!formProps.passwordConfirm) {
        errors.passwordConfirm = 'Please confirm your password.'
    }

    if(formProps.password != formProps.passwordConfirm) {
        errors.password = 'Passwords must match.';
    }

    return errors;
}


function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
    // return {};
}

SignUp = reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
})(SignUp);

export default SignUp = connect(mapStateToProps, actions)(SignUp);