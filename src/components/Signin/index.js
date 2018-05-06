import React from 'react';
import {withRouter} from 'react-router-dom';
import {signin, getToken} from '../services/tokenService';
import logo from '../../data/logo-black.svg';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			emailValue:'',
			passwordValue:'',
			errorMessage:'',
		};
	}

  componentDidMount(){
      if(getToken()) this.props.history.push('/home');
  }
  componentWillMount(){
      document.addEventListener("keydown", event=>{
          if(event.keyCode === 13){
              console.log(this.state.emailValue.length);
              console.log(this.state.passwordValue.length);
              if(this.state.emailValue.length > 0 && this.state.passwordValue.length > 0){
                  this.signInAction();
              }
          }
      }, false);
  }

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

  signInAction = async () => {
      await signin(this.state.emailValue, this.state.passwordValue).then(async (token)=>{
          console.log('signInAction: ',token);

          if (token) {
              this.props.history.push('/home');
          } else {
              this.errorBlock.style.display = 'flex';
              await setTimeout(() => {
                  this.errorBlock.style.display = '';
              }, 4000);
          }
      });
  };

  errorClose=()=>{
      this.errorBlock.style.display = 'none';
  };

  render(){
    return (
      <div>
				<form className="form-signin">
					<img className="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
						<h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
						<label htmlFor="inputEmail" className="sr-only">Email address</label>
						<input id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus="" type="email"/>
							<label htmlFor="inputPassword" className="sr-only">Password</label>
							<input id="inputPassword" className="form-control" placeholder="Password" required="" type="password"/>
              <div className="checkbox mb-3">
                <label>
                  <input value="remember-me" type="checkbox"/> Remember me
                </label>
              </div>
              <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
              <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
				</form>
      </div>
    );
  };
}


export default withRouter(SignIn);
