import React, { Component } from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import logo from "../../../data/logo.svg";
import "./index.scss";

class Footer extends Component {

	render() {
		return (
			<footer className="footer  bg-dark">
				<div className="container d-flex py-3">

					<div className="col">
						<img src={logo} alt='GIMET'/>
						<NavLink className="navbar-brand" to={"/"}>GIMET</NavLink>
					</div>

					<div className="col">

						<ul>
							<li>
								<i className="ion-chevron-right"></i>
								Authors:
							</li>
							<li className="text-muted">Manachynskyi Oleksii</li>
							<li className="text-muted">Roman Suprun</li>
						</ul>
					</div>

					<div className="col">
						<ul>
							<li>
								<i className="ion-chevron-right"></i>
								<NavLink to={"/edit/new"}>Create new expert</NavLink>
							</li>
							<li>
								<i className="ion-chevron-right"></i>
								<NavLink to={"/experts"}>Search for expert</NavLink>
							</li>
							<li>
								<i className="ion-chevron-right"></i>
								<NavLink to={"/about"}>About</NavLink>
							</li>
						</ul>
					</div>

					<div className="col">
						<NavLink to={"/experts"}>email: info@gimethub.com</NavLink>
					</div>

				</div>
			</footer>
		);
	}
}

export default withRouter(Footer);
