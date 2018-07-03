import React from 'react';
import {withRouter} from 'react-router-dom';
import {getToken} from '../services/tokenService';
import { login } from '../services/api-helper';
import alertHelper from '../services/alert-helper';
import logo from "../../data/logo-black.svg";
import './index.scss';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			emailValue:'',
			passwordValue:'',
			alert: 'Error!',
			alertDangerClass: 'd-none',
			alertInfoClass: 'd-none',
			submitTimer: 'Sign in',
			submitDisabled: false
		};
	}

  componentDidMount(){
		if(getToken()) this.props.history.push('/edit/new');
  }

	onEnterKeyDown=(event, ctx)=>{
		if(event.keyCode === 13){
			event.preventDefault();
			if(this.state.emailValue.length > 0 && this.state.passwordValue.length > 0){
				ctx.signInAction();
			}
		}
  };

  handleInputChange=(event)=>{
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
				break;
		}
  };

	async handleSubmit(event, ctx) {
		event.preventDefault();
		if(this.state.submitTimer.length){
			await ctx.signInAction();
		}
	}

  signInAction = async () => {
		this.setState({
			submitDisabled: true
		});

		const data = await login(this.state.emailValue, this.state.passwordValue);

		if (data.token) {
			this.setState({
				submitDisabled: false
			});
			this.props.history.push('/');
		}else if(data.message){
			console.error('signIn error: ', data.message);
			alertHelper(this, 'Error: '+data.message, 'danger');

			if(data.message.indexOf('Please try again later')>=0){
				const submitInterval = setInterval(()=>{
					let count = this.state.submitTimer.length ? 11 : this.state.submitTimer;
					count--;
					if(count===0){
						this.setState({
							submitTimer: 'Sign in',
							submitDisabled: false
						});
						clearInterval(submitInterval);
						return;
					}
					this.setState({
						submitTimer: count,
						submitDisabled: true
					});
				}, 1000);
			}else{
				this.setState({
					submitDisabled: false
				});
			}

		}
  };

  render(){
    return (
      <div className="Signup">
				<div className="container">
          <div className="d-flex flex-column">

            <img className="mb-4" src={logo} alt="" width="100" height="100"/>

            <div className="card">
              <div className="card-header d-flex">
                <p className="mb-0">Please sign up for Gimet</p>
                <small className="form-text text-muted ml-2">It's free!</small>
              </div>
              <div className="card-body">
                <form className="d-flex flex-column" onSubmit={this.signUpClick}>
                  <div className="form-group d-flex">
                    <label htmlFor="exampleInputEmail1">Full Name:</label>
                    <input type="name" className="form-control" name="name"
                           placeholder="" onChange={event=>{this.handleInputChange(event)}}/>
                  </div>
                  <div className="form-group d-flex">
                    <label htmlFor="exampleInputEmail1">Email Address:</label>
                    <input type="email" className="form-control" name="email"
                           placeholder="" onChange={event=>{this.handleInputChange(event)}}/>
                  </div>
                  <hr className="my-4 w-100"/>
                  <div className="form-group d-flex">
                    <label htmlFor="exampleInputPassword1">Password:</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password"
                           onChange={event=>{this.handleInputChange(event)}}/>
                  </div>
                  <div className="form-group d-flex">
                    <label htmlFor="exampleInputPassword1">Password Confirm:</label>
                    <div className="">
                      <input type="password-confirm" className="form-control" id="exampleInputPassword1" name="password"
                           onChange={event=>{this.handleInputChange(event)}}/>
                      <small id="passwordHelp" className="form-text text-muted pl-3">Use at least one letter, one numeral, and seven characters.</small>
                    </div>
                  </div>
                  <hr className="w-100"/>

                  <div className="d-flex justify-content-between align-items-center p-0">
                    <div className="socials d-flex align-items-center p-0">
                      <p className="text-uppercase m-0">Sign up with</p>
                      <div className="btn-group ml-3 p-0" role="group" aria-label="Basic example">
                        <button type="submit" className="btn btn-light"><i className="ion-social-facebook"></i></button>
                        <button type="submit" className="btn btn-light"><i className="ion-social-linkedin"></i></button>
                        <button type="submit" className="btn btn-light"><i className="ion-social-google"></i></button>
                        <button type="submit" className="btn btn-light"><i className="ion-social-github"></i></button>
                      </div>
                    </div>
                    <p className="text-muted m-0">-or-</p>
                    <button type="submit" className="btn btn-primary">Sign up</button>
                  </div>

                </form>
              </div>
            </div>

          </div>

				</div>

				<div className={"alert alert-danger "+this.state.alertDangerClass} role="alert">
					{this.state.alert}
				</div>
				<div className={"alert alert-info "+this.state.alertInfoClass} role="alert">
					{this.state.alert}
				</div>

      </div>
    );
  };

}


export default withRouter(SignIn);
