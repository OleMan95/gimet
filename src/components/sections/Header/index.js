import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getToken, signin } from "../../services/tokenService";
import logo from "../../../data/logo.svg";
import "./index.scss";


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
			navStyle: 'navbar-dark bg-dark',
			profileShow: '',
			isAuthorized: false
    };
  }
  componentDidMount(){
		if(getToken()){
			this.setState({
				isAuthorized: true
			});
		}

		window.onscroll = () => {
			const nav = this.nav;
			if(window.scrollY <= 50) nav.className = "Header navbar navbar-expand-lg fixed-top navbar-dark bg-dark";
			else nav.className = "Header navbar navbar-expand-lg fixed-top navbar-light bg-light";
		};

  }
	onSearchClick=()=>{
  };
	toggleProfile=()=>{
		let profileShow = this.state.profileShow.length > 0 ? '' : 'show';
		this.setState({
			profileShow
		});
  };
  // onSignOut=()=>{
  //   alert("Click!");
  // }
  render() {
    return (
      <nav className={"Header navbar navbar-expand-lg fixed-top navbar-dark bg-dark"} ref={elem=>this.nav=elem}>
        <img src={logo} alt={'logo'}/>
        <a className="navbar-brand" href="#">GIMET</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Experts</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Docs</a>
            </li>

						{this.state.isAuthorized ?
							<li className={"nav-item dropdown "+this.state.profileShow}>
								<a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown"
									 aria-haspopup="true" aria-expanded="false" onClick={this.toggleProfile}>
									Profile
								</a>
								<div className={"dropdown-menu "+this.state.profileShow} aria-labelledby="navbarDropdown">
									<p className="dropdown-item">Signed as <br/><b>Oleksii Manachynskyi</b></p>
									<div className="dropdown-divider"></div>
									<a className="dropdown-item" href="#">Your experts</a>
									<div className="dropdown-divider"></div>
									<a className="dropdown-item" href="#">Help</a>
									<a className="dropdown-item" href="#">Sign out</a>
								</div>
							</li> : ''}


          </ul>
          <div className="form-inline my-2 my-lg-0">
   	        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>

						{this.state.isAuthorized ? '' :
							<NavLink to="/login" className="login-link nav-link " >Sign in</NavLink>}

          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
