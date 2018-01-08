import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class SignIn extends React.Component { //все this.props мы получем как аргументы функции
    state = {
        formContent:(
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
        ),
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

    signInAction=(context)=>{

        fetch('/v1/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ // занесение данных в JSON
                email: this.state.emailValue,
                password: this.state.passwordValue
            })
        }).then((response) => {
            response.json().then(async function (data) {
                if (data.data) {
                    context.props.history.push('/home');
                } else {
                    context.errorBlock.style.display = 'flex';
                    await setTimeout(()=>{
                        context.errorBlock.style.display = '';
                    }, 4000);
                }
            });
            return response;
        }).catch(function(error) {
            console.log('There has been a problem with fetch operation: ' + error.message);
        });
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
                    {this.state.formContent}
                </div>
            </div>
        );
    }
}

export default withRouter(connect(
    state=>({
        store: state,
    }),
    dispatch=>({})
)(SignIn));
