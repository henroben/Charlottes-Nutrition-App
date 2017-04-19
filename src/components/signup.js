import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from './../actions';

class SignUp extends Component {

    handleFormSubmit(formProps) {
        console.log('formprops', formProps);
        this.props.startCreateUser(formProps.email, formProps.password);
        // let {dispatch} = this.props;
        // dispatch(startCreateUser(formProps.email, formProps.password));
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
        const { handleSubmit, fields: { email, password, passwordConfirm }, pristine } = this.props;
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
                                    <button action="submit" disabled={pristine} className="btn btn-primary btn-block">Sign Up</button>
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
    return { errorMessage: state.auth.error };
    // return {};
}

SignUp = reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
})(SignUp);

export default SignUp = connect(mapStateToProps, actions)(SignUp);