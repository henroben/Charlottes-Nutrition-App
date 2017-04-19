import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from './../actions';

class SignUp extends Component {

    handleFormSubmit(formProps) {
        console.log(formProps);
        // this.props.signupUser(formProps);
    }

    renderError() {
        if(this.props.errorMessage) {
            return <div className="alert alert-danger">{this.props.errorMessage}</div>;
        }
    }

    renderField(field) {
        return (
            <div>
                <input {...field.input} type={field.type} className="form-control" />
                {field.meta.touched && field.meta.error && <div className="alert alert-danger">{field.meta.error}</div>}
            </div>
        );
    }
    render() {
        const { handleSubmit, fields: { email, password, passwordConfirm } } = this.props;
        return(
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <div className="panel panel-default">
                        <div className="panel-heading">Sign Up</div>
                        <div className="panel-body">
                            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                                <fieldset className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <Field {...email} type="email" name="email" component={this.renderField} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label htmlFor="password" >Password:</label>
                                    <Field {...password} type="password" name="password" component={this.renderField} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label htmlFor="passwordConfirm">Confirm Password:</label>
                                    <Field {...passwordConfirm} type="password" name="passwordConfirm" component={this.renderField} />
                                </fieldset>
                                {this.renderError()}
                                <div className="form-group">
                                    <button action="submit" className="btn btn-primary btn-block">Sign Up</button>
                                </div>
                            </form>
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

    if(!formProps.password) {
        errors.password = 'Please enter a password.'
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
    // return { errorMessage: state.auth.error };
    return state;
}

SignUp = reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
})(SignUp);

export default SignUp = connect(mapStateToProps, actions)(SignUp);