import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, NavLink, withRouter, Link } from 'react-router-dom';


import '../css/App.css';
import Home from './home_components/Home';



const StartPage = (match) => { //все this.props мы получем как аргументы функции
  let signInInput = '';       //тут обьявляются все переменные (типа this.state)
  let usernameValue = '';
  let emailValue = '';
  let passwordValue = '';

  const handleInputChange=(event)=>{
    switch (event.target.name) {
      case 'username':
        usernameValue = event.target.value;
        break;
      case 'email':
        emailValue = event.target.value;
        break;
      case 'password':
        passwordValue = event.target.value;
        break;
      default:
    }
  }

  return (
    <div>
      <header className="header" >
        <NavLink to="/" activeClassName="Start-header-logo-active" className="header-logo">
          <div className="header-logo-img"></div>
          <p className="header-logo-title">GIMET</p>
        </NavLink>
        <div className="header-btnsDiv">
          <a href="#about_block" id="about" className="header-btns">About</a>
          <a href="#contact_block" id="contact" className="header-btns">Contact</a>
          <NavLink to="/home" id="signInBtn" className="header-btns">Sign in</NavLink>
        </div>
      </header>

      <div className="Start">
        <div className="Start-content">
          {ContentBody}

          <div className="Start-signUpDiv">
            <div className="Start-signUpDiv-form">
              <label className="Start-signUpDiv-labels">Username</label>
              <input type="text" name="username" placeholder="Pick a username" className="Start-signUpDiv-inputs"
                ref={(input)=>{signInInput = input}}
                onChange={handleInputChange}/>
              <label className="Start-signUpDiv-labels">Email</label>
              <input type="email" name="email" placeholder="you@example.com" className="Start-signUpDiv-inputs"
                ref={(input)=>{signInInput = input}}
                onChange={handleInputChange}/>
              <label className="Start-signUpDiv-labels">Password</label>
              <input type="password" name="password" placeholder="Create a password" className="Start-signUpDiv-inputs"
                ref={(input)=>{signInInput = input}}
                onChange={handleInputChange}/>
              <p>Use at least one letter, one numeral, and seven characters.</p>
            </div>

            <button type="button" name="signUpBtn" id="signUpBtn" onClick={onClickHandler}>Sign up</button>
          </div>
        </div>
      </div>

      <div className='Start-about' id="about_block">
        <div >
          <h2>About GIMET</h2>
          <p>Gimet is a platform for creating expert systems. 
            An expert system is an intelligent computer program 
            that contains the knowledge and analytical capabilities 
            of one or more experts in a particular field of application,
            and is able to draw logical conclusions based on this knowledge, 
            thus providing specific tasks (counseling, training, diagnosis,
            testing, designing etc.) without the participation of an expert
            (specialist in a specific problem area). It is also defined
            as a system that uses a knowledge base for solving problems 
            (issuing recommendations) in a particular subject area.
            You can use this platform to develop your own expert system and further exploit it.</p>
        </div>
      </div>

      <div className='Start-contact' id="contact_block">
        <div>
          <h2>Contact Us:</h2>
          <form id="form">
            <div className="contact-inputsDiv">
              <div className="contact-inputs">
                <label for="contact-name">Name: </label>
                <input type="text" id="contact-name" placeholder="Enter your name"/>
              </div>
              <div className="contact-inputs">
                <label for="contact-email">Email: </label>
                <input type="email" id="contact-email" placeholder="enter@your.email"/>
              </div>
            </div>

            <div className="contact-inputs">
              <label for="contact-subject">Subject: </label>
              <input type="text" id="contact-subject" placeholder="Subject..."/>
            </div>

            <div className="contact-inputs">
              <label for="msgInp" >Message: </label>
              <textarea id="msgInp" placeholder="Message..."></textarea>
            </div>

          </form>
          <button type="button">Send</button>
        </div>
      </div>
    </div>
  );
}





const ContentBody = (
  <div className="Start-contentBody">
    <div className="Start-contentBody-div1">
      <div className="Start-contentBody-logo"></div>
      <div className="Start-contentBody-logoBorder"></div>
    </div>
    <h3 className="Start-contentBody-text1">Expert systems for everybody.</h3>
  </div>
);



//actions
var onClickHandler =()=>{
  alert('click');
}

export default withRouter(connect(
  state=>({
    store: state,
  }),
  dispatch=>({})
)(StartPage));
