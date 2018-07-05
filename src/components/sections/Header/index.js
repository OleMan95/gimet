import React, { Component } from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import { getToken } from "../../services/tokenService";
import { getUserById } from "../../services/api-helper";
import logo from "../../../data/logo.svg";
import "./index.scss";
import ExpertChatButton from '../../sections/ExpertChatButton';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
			navStyle: 'navbar-dark bg-dark',
			profileShow: '',
			isAuthorized: false,
			user: {}
    };
  }

  async componentDidMount() {

		if (getToken('token')) {
			await getUserById(false, false, (data)=>{

				this.setState({
					isAuthorized: true,
					user: data
				});
			}, (data)=>{

			});

		}

		window.onscroll = () => {
			const nav = this.nav || {className:''};
			if (window.scrollY <= 50) nav.className = "Header navbar navbar-expand-lg fixed-top navbar-dark bg-dark";
			else nav.className = "Header navbar navbar-expand-lg fixed-top navbar-light bg-light";
		};

		let pathname = window.location.pathname;
		let children = this.navBar.children;

		// Home
		if(/\/{1}/.test(pathname)) {
			for (let i = 0; i < children.length; i++) {
				children[i].classList.remove('active');
				this.homeNavItem.classList.add('active');
			}
		}
		// Profile
		if(/profile/gi.test(pathname) || /edit/gi.test(pathname)) {
			for (let i = 0; i < children.length; i++) {
				children[i].classList.remove('active');
				if(this.profileNavItem) this.profileNavItem.classList.add('active');
			}
		}

	}

	componentWillUnmount(){
		document.removeEventListener('click', this.handleClick, false);
	}

	handleClick=()=>{
		if (!this.state.profileShow.length > 0) {
			// attach/remove event handler
			document.addEventListener('click', this.handleClick, false);
		} else {
			document.removeEventListener('click', this.handleClick, false);
		}

		let profileShow = this.state.profileShow.length > 0 ? '' : 'show';
		this.setState({
			profileShow
		});
	};

	onSignOut=()=>{
		let name = 'at';
		let value = 'false';
		let options = {expires: -1};

		let expires = options.expires;

		if (typeof expires == "number" && expires) {
			let d = new Date();
			d.setTime(d.getTime() + expires * 1000);
			expires = options.expires = d;
		}
		if (expires && expires.toUTCString) {
			options.expires = expires.toUTCString();
		}

		value = encodeURIComponent(value);

		let updatedCookie = name + "=" + value;

		for (let propName in options) {
			updatedCookie += "; " + propName;
			let propValue = options[propName];
			if (propValue !== true) {
				updatedCookie += "=" + propValue;
			}
		}

		document.cookie = updatedCookie;

		this.setState({
			isAuthorized: false,
		});
	};

  render() {
    return (
			<nav className={"Header navbar navbar-expand-lg fixed-top navbar-dark bg-dark"} ref={elem=>this.nav=elem}>
				<img src={logo} alt={'logo'}/>
				<a className="navbar-brand" href="/">GIMET</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
								aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto" ref={elem => this.navBar = elem}>
						<li className="nav-item" ref={(elem=>this.homeNavItem=elem)}>
							<span className="nav-link"><NavLink to='/'>Home</NavLink></span>
						</li>
						{/*<li className="nav-item" ref={(elem=>this.expertsNavItem=elem)}>*/}
							{/*<span className="nav-link"><NavLink to='/'>Experts</NavLink></span>*/}
						{/*</li>*/}
						{/*<li className="nav-item" ref={(elem=>this.aboutNavItem=elem)}>*/}
							{/*<span className="nav-link"><NavLink to='/'>About us</NavLink></span>*/}
						{/*</li>*/}
						{/*<li className="nav-item" ref={(elem=>this.docsNavItem=elem)}>*/}
							{/*<span className="nav-link"><NavLink to='/'>Docs</NavLink></span>*/}
						{/*</li>*/}

					{this.state.isAuthorized ?
						<li className={"nav-item dropdown "+this.state.profileShow} ref={(elem=>this.profileNavItem=elem)}>
							<a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown"
								 aria-haspopup="true" aria-expanded="false" onClick={this.handleClick}>
								Profile
							</a>
							<div className={"dropdown-menu "+this.state.profileShow} aria-labelledby="navbarDropdown" onClick={event=>event.stopPropagation()}>
								<p className="dropdown-item">Signed as <br/><b>{this.state.user.name}</b></p>
								<div className="dropdown-divider"></div>
								<NavLink className="dropdown-item" to={"/profile/"+this.state.user._id}>My experts ({this.state.user.experts.length})</NavLink>
								<div className="dropdown-divider"></div>
								<a className="dropdown-item" href={"/"}>Help</a>
								<a className="dropdown-item" href={"/"} onClick={this.onSignOut}>Sign out</a>
							</div>
						</li> : ''}


					</ul>
					<div className="form-inline my-2 my-lg-0">
						{/*<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>*/}

						{this.state.isAuthorized ? '' :
              <div className="d-flex">
                <a href="/login" className="login-link nav-link" >Sign in</a>
                <a href="/signup" className="login-link nav-link" >Sign up</a>
              </div>}


						{this.state.isAuthorized ? <ExpertChatButton /> :
							''}

					</div>
				</div>

 			</nav>
    );
  }
}

export default withRouter(Header);
