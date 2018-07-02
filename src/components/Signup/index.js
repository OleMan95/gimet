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

					<div className="card text-white bg-dark">
            <div className="card-body">
              <form className="col d-flex" onSubmit={this.signUpClick}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Name</label>
                  <input type="name" className="form-control" id="exampleInputName1"
                         aria-describedby="emailHelp" name="name"
                         placeholder="Enter your full name" onChange={event=>{this.handleInputChange(event)}}/>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail"
                         aria-describedby="emailHelp" name="email"
                         placeholder="Enter email" onChange={event=>{this.handleInputChange(event)}}/>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" name="password"
                         placeholder="Password" onChange={event=>{this.handleInputChange(event)}}/>
                  <small id="emailHelp" className="form-text text-muted">Use at least one letter, one numeral, and seven characters.</small>
                </div>
                <button type="submit" className="btn btn-primary">Sign up</button>
              </form>
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
