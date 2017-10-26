import React, { Component } from 'react';
import {BrowserRouter, Route, NavLink, withRouter } from 'react-router-dom';


import Home from './Home';
import '../css/App.css';
import '../css/SignIn.css';

// class SignIn extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//
//   render() {
//     return (
//         <div className="SignIn-content">
//           <div className="SignIn-enter">
//             <p className="SignIn-enter-p1">Sigh in to Gimet</p>
//             <label className="SignIn-enter-labels">Username or email address</label>
//             <input type="text" name="login" value="" className="SignIn-enter-inputs"/>
//
//             <div className="SignIn-pass">
//               <label className="SignIn-enter-labels">Password</label>
//               <a className="SignIn-forgotPass">forgot the password?</a>
//             </div>
//
//             <input type="text" name="password" value="" className="SignIn-enter-inputs"/>
//
//             <button type="button" name="startConsultBtn" id="SignIn-signInBtn">Sign in</button>
//           </div>
//         </div>
//
//     );
//   }
// }
  
const SignIn = (match) => {
  console.log('sign in page');

  return (
    <BrowserRouter>
      <div>
        <header className="SignIn-header">
          <NavLink to="/" id="SignIn-homeBtn" onClick={()=>this.onHomeClick()}>
            <div className="SignIn-logo-header"></div>
          </NavLink>
        </header>
        <div className="SignIn-content">
          <div className="SignIn-enter">
            <p className="SignIn-enter-p1">Sigh in to Gimet</p>
            <label className="SignIn-enter-labels">Username or email address</label>
            <input type="text" name="login" value="" className="SignIn-enter-inputs"/>

            <div className="SignIn-pass">
              <label className="SignIn-enter-labels">Password</label>
              <a className="SignIn-forgotPass">forgot the password?</a>
            </div>
            <input type="text" name="password" value="" className="SignIn-enter-inputs"/>

            <div type="button" name="startConsultBtn" id="SignIn-signInBtn">
              <NavLink to={'/home'}>Sign in</NavLink>
            </div>
          </div>
        </div>
        <Route path={"/home"} component={Home}/>
      </div>
    </BrowserRouter>

  );
}

export default SignIn;
