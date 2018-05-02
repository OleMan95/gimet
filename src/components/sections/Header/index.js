import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../../data/logo.svg";
import "./index.scss";


class Header extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     count:0
  //   };
  // }
  // onSignIn=()=>{
  //   alert("Sign in!");
  // }
  // onSignOut=()=>{
  //   alert("Click!");
  // }
  render() {
    // let context = this.props.context;
    // let header;
    // switch (context) {
    //   case "Home":
    //     header = (
    //       <header id="Home-header">
    //         <div className="Home-header-content">
    //           <button type="button" name="homeBtn" id="homeBtn" onClick={()=>this.onSignOut()}><div className="App-logo-header"></div></button>
    //           <button type="button" name="profileBtn" id="profileBtn" onClick={()=>this.onSignOut()}>Manachynskyi Oleksii</button>
    //         </div>
    //         <div className="Home-header-buttons">
    //           <button type="button" name="addExpertBtn" id="addExpertBtn" onClick={()=>this.onSignOut()}>+</button>
    //           <button type="button" name="signOutBtn" id="signOutBtn" onClick={()=>this.onSignOut()}>Sign out</button>
    //         </div>
    //       </header>
    //     );
    //     break;
    //   default:
    //     header = (
    //       <header id="App-header">
    //         <div className="App-logo-header"></div>
    //         <button type="button" name="signInBtn" id="signInBtn" onClick={()=>this.onSignIn()}>Sign in</button>
    //         <Link to="authorized">Sign in</Link>
    //       </header>
    //     );
    //
    // }
    return (
      <nav className="Header navbar navbar-expand-lg navbar-dark bg-dark">
        <img src={logo} alt={'logo'}/>
        <a className="navbar-brand" href="#">GIMET</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    );
  }
}

export default Header;
