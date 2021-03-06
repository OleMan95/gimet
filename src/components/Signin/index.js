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
		if(getToken()) this.props.history.push('/');
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
      <div className="SignIn">
				<div className="container text-center">
					<form className="form-signin" onSubmit={event=>this.handleSubmit(event, this)}>
						<img className="mb-4" src={logo} alt="" width="100" height="100"/>
						<h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
						<label htmlFor="inputEmail" className="sr-only">Email address</label>
						<input id="inputEmail" name="email" className="form-control" placeholder="Email address" required=""
									 autoFocus=""
									 type="email"
									 onChange={this.handleInputChange}/>
						<label htmlFor="inputPassword" className="sr-only">Password</label>
						<input id="inputPassword" name="password" className="form-control" placeholder="Password" required=""
									 type="password"
									 onChange={this.handleInputChange}
									 onKeyDown={event=>this.onEnterKeyDown(event, this)}/>
						<div className="checkbox mb-3">
							<label>
								<input value="remember-me" type="checkbox"/> Remember me
							</label>
						</div>
						<button className="btn btn-lg btn-primary btn-block" disabled={this.state.submitDisabled} type="submit">{this.state.submitTimer}</button>
					</form>
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
