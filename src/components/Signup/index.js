import React from 'react';
import {withRouter} from 'react-router-dom';
import { signUp } from '../services/api-helper';
import alertHelper from '../services/alert-helper';
import logo from "../../data/logo-black.svg";
import './index.scss';

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			emailValue:'',
			passwordValue:'',
      nameValue:'',
			alert: '',
      alertDangerClass: 'd-none',
      alertInfoClass: 'd-none'
		};
	}

  componentDidMount(){

  }

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
			case 'name':
				this.setState({
          	nameValue:event.target.value,
				});
				break;
			default:
				break;
		}
  };

	handleSubmit= async (event) => {
		event.preventDefault();
    const res = await signUp({
      name: this.state.nameValue,
      email: this.state.emailValue,
      password: this.state.passwordValue
    });

    if(res){
      alertHelper(this, 'Registration successfully completed');
      // this.props.history.push('/');
    }else
      alertHelper(this, 'Oops, some error occurred. Try again later', 'danger');

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
                <form className="d-flex flex-column" onSubmit={this.handleSubmit}>
                  <div className="form-group d-flex">
                    <label htmlFor="name">Full Name:</label>
                    <input type="name" className="form-control" id="name" name="name"
                           placeholder="" onChange={event=>{this.handleInputChange(event)}}/>
                  </div>
                  <div className="form-group d-flex">
                    <label htmlFor="email">Email Address:</label>
                    <input type="email" className="form-control" id="email" name="email"
                           placeholder="" onChange={event=>{this.handleInputChange(event)}}/>
                  </div>
                  <hr className="my-4 w-100"/>
                  <div className="form-group d-flex">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" name="password"
                           onChange={event=>{this.handleInputChange(event)}}/>
                  </div>
                  <div className="form-group d-flex">
                    <label htmlFor="password-confirm">Password Confirm:</label>
                    <div className="">
                      <input type="password" className="form-control" id="password-confirm" name="password"
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


export default withRouter(SignUp);