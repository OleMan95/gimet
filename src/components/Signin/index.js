import React from 'react';
import {withRouter} from 'react-router-dom';
import {signin, getToken} from '../services/tokenService';
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
		console.log('handleSubmit');
		if(this.state.submitTimer.length){
			await ctx.signInAction();
		}
	}

  signInAction = async () => {
		this.setState({
			submitDisabled: true
		});

		const data = await signin(this.state.emailValue, this.state.passwordValue);

		if (data.token) {
			this.props.history.push('/');
			this.setState({
				submitDisabled: false
			});
		}else if(data.message){
			console.error('signIn error: ', data.message);
			this.alertHelper('Error: '+data.message, 'danger');

			if(data.message.indexOf('Please try again later')>=0){
				const submitInterval = setInterval(()=>{
					let count = this.state.submitTimer.length ? 11 : this.state.submitTimer;
					count--;
					console.log('count: ', count);
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
						<input id="inputEmail" name="email" className="form-control" placeholder="Email address" required="" autoFocus="" type="email"
									 onKeyDown={event=>this.onEnterKeyDown(event, this)} onChange={this.handleInputChange}/>
						<label htmlFor="inputPassword" className="sr-only">Password</label>
						<input id="inputPassword" name="password" className="form-control" placeholder="Password" required="" type="password"
									 onKeyDown={event=>this.onEnterKeyDown(event, this)} onChange={this.handleInputChange}/>
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

	alertHelper=(message, type)=>{
		if(type === 'danger'){
			this.setState({
				alert: message,
				alertDangerClass: 'alert-opacity'
			});
			setTimeout(()=>{
				this.setState({
					alert: 'Error!',
					alertDangerClass: 'd-none'
				});
			}, 4000);
		}else{
			this.setState({
				alert: message,
				alertInfoClass: 'alert-opacity'
			});
			setTimeout(()=>{
				this.setState({
					alert: 'Error!',
					alertInfoClass: 'd-none'
				});
			}, 4000);
		}
	}

}


export default withRouter(SignIn);
