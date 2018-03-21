import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {NEW_EXPERT} from "../constants/types";
import {signin} from '../services/tokenService';

class SignIn extends React.Component { //все this.props мы получем как аргументы функции
    state = {
        emailValue:'',
        passwordValue:'',
        errorMessage:'',
    };

    handleInputChange=(event)=>{ // занесение данных с формы в локальные переменные
        switch (event.target.name) {
            case 'email':
                this.setState({
                    emailValue:event.target.value,
                });
                break;
            case 'password':
                this.setState({
                    passwordValue:event.target.value,
                });
                break;
            default:
        }
    };

    signInAction = async (context) => {

        const result = signin(this.state.emailValue, this.state.passwordValue);

        console.log('result: ',result);
        if (result) {
            this.props.history.push('/home');
        } else {
            this.errorBlock.style.display = 'flex';
            await setTimeout(() => {
                this.errorBlock.style.display = '';
            }, 4000);
        }

    };

    errorClose=()=>{
        this.errorBlock.style.display = 'none';
    };

    render(){
        return (
            <div>
                <div className="SignIn-form">
                    <div className="SignIn-mainLogo"/>
                    <h2>Sign in to GIMET</h2>
                    <div className="SignIn-errorBlock"
                         ref={(div)=>this.errorBlock = div}>
                        <p>Incorrect email or password</p>
                        <button className="SignIn-errorCloseBtn"
                            onClick={() => this.errorClose()}/>
                    </div>
                    <div>
                        <div>
                            <label>Email</label>
                            <input type="email" name="email"
                                   placeholder="you@example.com"
                                   onChange={(event)=>this.handleInputChange(event)}/>

                            <label>Password</label>
                            <input type="password" name="password"
                                   placeholder="Enter a password"
                                   onChange={(event)=>this.handleInputChange(event)}/>
                        </div>
                        <button onClick={()=>this.signInAction(this)}>Login</button>
                    </div>
                </div>
            </div>
        );
    };
}

export default withRouter(connect(
    state=>({
        store: state,
    }),
    dispatch=>({
        setUser: (user)=>{
            dispatch({type:'NEW_EXPERT',payload: user});
        }
    })
)(SignIn));
