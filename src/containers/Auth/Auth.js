import React, { Component } from 'react';
import classes from './Auth.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateObject } from '../../shared/utility';
import { checkValidity } from '../../shared/validation';


import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount(){
        if(!this.props.building && this.props.redirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    submitHandler = event => {
        event.preventDefault();
      
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    inputChangedHandler = (event, controlId) => {

        const updatedControls = updateObject(this.state.controls, {
            [controlId]: updateObject(this.state.controls[controlId], {
                ...this.state.controls[controlId],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlId].validation),
                touched: true
            })
        })
        
        this.setState({controls: updatedControls});
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }

    render(){

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = null;

        if(this.props.loading){
            form = <Spinner />
        }else{
            form = (
                <form onSubmit={this.submitHandler}>
                 {formElementsArray.map(formElement => {
                 return <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                 /> 
                 })}
                 <Button btnType="Success" >{this.state.isSignUp ? 'SIGN UP' : 'LOG IN'}</Button>
                </form>
            )
        }

        let errorMessage = null;

        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.redirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {form}
                {errorMessage}
                <Button
                     btnType="Danger"
                     clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP' }
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.bb.building,
        redirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);